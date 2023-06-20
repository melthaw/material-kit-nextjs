import { toast } from 'react-toastify';

const processResp = async (resp: Response, debug?: boolean) => {
  // special http handler for 401 & 403
  if (resp.status === 401) {
    toast.error('Unauthorized. Please sign in.');
    return Promise.reject('Unauthorized');
  }
  if (resp.status === 403) {
    toast.error('Has no permission');
    return Promise.reject('Forbidden');
  }
  if (resp.status === 502) {
    toast.error('Bad Gateway');
    return Promise.reject('Bad Gateway');
  }
  if (resp.status === 503) {
    toast.error('Service Unavailable');
    return Promise.reject('Service Unavailable');
  }
  if (resp.status === 504) {
    toast.error('The server is taking longer than expected to respond. Please try again later.');
    return Promise.reject('Gateway Timeout');
  }

  if (resp.status === 204) {
    return {};
  }

  // general http handler
  const hasError = resp.status !== 200;
  let respData: any = {};
  try {
    respData = await resp.json();
    debug && console.log(respData);
  } catch (e) {
    debug && console.error('failed to do resp.json()', e);
  }

  if (hasError) {
    if (respData.message) {
      toast.error(respData.message);
      return Promise.reject(respData.message);
    } else {
      toast.error(resp.statusText);
      return Promise.reject(resp.statusText);
    }
  }

  if (respData.errors && respData.message) {
    toast.error(respData.message);
    return Promise.reject(respData.message);
  }

  return respData;
};

const applyTimeoutController = async (callback: (_: any) => any, options?: any) => {
  // TODO move default timeout value 30s to config
  const { timeout = 30 * 1000 } = options ?? {};
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await callback(controller.signal);
  } catch (e) {
    if (e.name === 'AbortError') {
      toast.error('Timeout and abort.');
    }
    throw e;
  } finally {
    clearTimeout(id);
  }
};

export const loadToken = (): string => {
  // TODO
  return null;
};

export const getApi = async (url: string, queryParams?: any, options?: any) => {
  return applyTimeoutController(async (signal: AbortSignal) => {
    const token = loadToken();
    const headers = token ? { Authorization: 'Bearer ' + token } : {};
    const endpoint = queryParams ? url + '?' + new URLSearchParams(queryParams).toString() : url;
    let fetchOptions = {
      method: 'GET',
      headers,
      signal
    };
    if (options) {
      fetchOptions = { ...fetchOptions, ...options };
    }
    return await fetch(endpoint, fetchOptions).then(processResp);
  });
};

export const postApi = async (url: string, body?: any, options?: any) => {
  const { timeout } = options ?? {};
  return applyTimeoutController(
    async (signal: AbortSignal) => {
      const token = loadToken();
      const headers = token
        ? { Authorization: token, 'Content-type': 'application/json' }
        : { 'Content-type': 'application/json' };
      let fetchOptions = {
        method: 'POST',
        body: body ? JSON.stringify(body) : null,
        headers,
        signal
      };
      if (options) {
        fetchOptions = { ...fetchOptions, ...options };
      }
      return fetch(url, fetchOptions).then(processResp);
    },
    timeout ? { timeout } : {}
  );
};

export const putApi = async (url: string, body?: any, options?: any) => {
  return applyTimeoutController(async (signal: AbortSignal) => {
    const token = loadToken();
    const headers = token
      ? { Authorization: token, 'Content-type': 'application/json' }
      : { 'Content-type': 'application/json' };
    let fetchOptions = {
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
      headers,
      signal
    };
    if (options) {
      fetchOptions = { ...fetchOptions, ...options };
    }
    return fetch(url, fetchOptions).then(processResp);
  });
};

export const deleteApi = async (url: string, queryParams?: any, options?: any) => {
  return applyTimeoutController(async (signal: AbortSignal) => {
    const token = loadToken();
    const headers = token ? { Authorization: token } : {};
    const endpoint = queryParams ? url + '?' + new URLSearchParams(queryParams).toString() : url;
    let fetchOptions = {
      method: 'DELETE',
      headers,
      signal
    };
    if (options) {
      fetchOptions = { ...fetchOptions, ...options };
    }
    return await fetch(endpoint, fetchOptions).then(processResp);
  });
};

/**
 * Get the headers for sse requests.
 */
export const getStreamHeader = () => {
  const token = loadToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest',
    Authorization: token
  };
  return headers;
};
