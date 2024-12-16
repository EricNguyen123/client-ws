/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import config from "./config"
import { RootState, store } from "./store/store"
import { login } from "./store/auth/actions"
import { ErrorNumber } from "./common/general"

type CredentialsType = {
  email: string
  password: string
}

export const selectUser = (state: RootState) => state.auth;


export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as CredentialsType

        store.dispatch(
          login({
            data: { email: email, password: password },
            setError: (error) => {
              if (error.status >= ErrorNumber.ErrorCode) {
                
              }
            },
          })
        );
        
        const user = await new Promise((resolve) => {
          const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            const auth = selectUser(state);
            
            if (auth.userInfo) {
              unsubscribe();
              resolve(auth);
            } else {
              unsubscribe();
              resolve(null);
            }
          });
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }
      
        return user; 
      },
    }),
  ],
  pages: {
    signIn: `/${config.routes.public.login}`,
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = token
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
