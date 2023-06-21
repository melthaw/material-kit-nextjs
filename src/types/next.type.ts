import { NextApiRequest, NextApiResponse } from 'next';

export type NextApiRequestWithUser = NextApiRequest & {};

export type NextApiResponseWithError = NextApiResponse & {
  errorMsg?: string;
  errorCode?: string;
  errorData?: any;
};
