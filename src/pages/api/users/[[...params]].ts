import { createHandler, Get, Req } from '@storyofams/next-api-decorators';
import { getUserById } from '@/domain/user.service';
import { NextApiRequest } from 'next';

class UserHandler {
  @Get()
  async test(@Req() req: NextApiRequest) {
    await getUserById('test-id');
    return {};
  }
}

export default createHandler(UserHandler);
