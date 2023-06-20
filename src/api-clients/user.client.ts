import { getApi } from '@/api-clients/http-client';

const USERS_URL_PREFIX = '/api/users';

export const testGetUser = () => {
  return getApi(USERS_URL_PREFIX);
};
