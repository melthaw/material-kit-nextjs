import { createHandler, Get, Req, Catch } from '@storyofams/next-api-decorators';
import { getUserById, getUserByUsername } from '@/domain/user.service';
import type { NextApiRequest } from 'next';
import { exceptionHandler } from '@/pages/_app/api-middleware';

@Catch(exceptionHandler)
class UserHandler {
  @Get()
  async test(@Req() req: NextApiRequest) {
    const result = await  getUserByUsername('test12345678');
    if (!result) {
      throw new Error('User not found');
    }
    return result;
  }
}

export default createHandler(UserHandler);
