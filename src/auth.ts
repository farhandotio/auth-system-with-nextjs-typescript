import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectDB from './lib/connectDB';
import bcrypt from 'bcryptjs';
import User from './models/user.model';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid email or password');
        }
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider == 'google') {
        await connectDB();
        let DBUser = await User.findOne({ email: user.email });
        if (!DBUser) {
          DBUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        user.id = DBUser._id.toString();
        user.role = DBUser.role;
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
});
