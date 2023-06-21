import { HttpException } from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';

export const exceptionHandler = (
  error: any,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // TODO replace with logger
  console.error(error);
  // TODO handle auth error & biz error
  if (error instanceof HttpException) {
    const { statusCode, errors, stack, message } = error as HttpException;
    res.status(statusCode).json({
      success: false,
      statusCode,
      errors,
      stack,
      message
    });
    return;
  }
  const message = error instanceof Error ? error.message : 'An unknown error occurred.';
  const { stack } = error as Error;
  res.status(500).json({ success: false, statusCode: 500, message, stack });
};
