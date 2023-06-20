// Import the Prisma client
import { PrismaClient, User } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

export async function createUser(username: string, email: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password
    }
  });
  return user;
}

// Get a user by ID
export async function getUserById(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  return user;
}

// Update a user's password
export async function updateUserPassword(userId: string, newPassword: string): Promise<User | null> {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: newPassword
    }
  });
  return updatedUser;
}

// Delete a user
export async function deleteUser(userId: string): Promise<void> {
  await prisma.user.delete({
    where: {
      id: userId
    }
  });
}
