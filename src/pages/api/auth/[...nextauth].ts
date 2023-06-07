import NextAuth from 'next-auth';
import { compare } from 'bcryptjs';
import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Material Kit Nextjs',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        account: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // // You need to provide your own logic here that takes the credentials
        // // submitted and returns either a object representing a user or value
        // // that is false/null if the credentials are invalid.
        // // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // // You can also use the `req` object to obtain additional parameters
        // // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        //
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // // Return null if user data could not be retrieved
        // return null

        const { account, password } = credentials;

        // mock
        return {
          id: 'mock-id',
          username: account,
          name: account,
          email: account,
        } as User;
      }
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/login',
  },
  // pages: {
  //   signIn: '/login'
  // },
  // session: {
  //   strategy: 'jwt'
  // },
  // providers: [
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  //   }),
  //   GitHubProvider({
  //     clientId: process.env.GITHUB_ID as string,
  //     clientSecret: process.env.GITHUB_SECRET as string
  //   }),
  //   CredentialsProvider({
  //     name: 'Sign in',
  //     credentials: {
  //       email: {
  //         label: 'Email',
  //         type: 'email',
  //         placeholder: 'example@example.com'
  //       },
  //       password: { label: 'Password', type: 'password' }
  //     },
  //     async authorize(credentials) {
  //       if (!credentials?.email || !credentials.password) {
  //         return null;
  //       }
  //
  //       const user = await prisma.user.findUnique({
  //         where: {
  //           email: credentials.email
  //         }
  //       });
  //
  //       if (!user || !(await compare(credentials.password, user.password))) {
  //         return null;
  //       }
  //
  //       return {
  //         id: user.id,
  //         email: user.email,
  //         name: user.name,
  //         randomKey: 'Hey cool'
  //       };
  //     }
  //   })
  // ],
  // callbacks: {
  //   session: ({ session, token }) => {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey
  //       }
  //     };
  //   },
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //         randomKey: u.randomKey
  //       };
  //     }
  //     return token;
  //   }
  // }
};

export default NextAuth(authOptions);
