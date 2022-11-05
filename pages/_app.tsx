// import '@/styles/reset.css'
import '@/styles/global.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from 'frontend/models/store';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React from 'react';

const publicPages = [
  '/auth/[authType]',
]

export default function WaypointWeb({ Component, pageProps }: AppProps) {
  const store = useStore()
  const {pathname} = useRouter()
  const isPublicPage = publicPages.includes(pathname)
  return (
    <ClerkProvider>
      <Provider store={store}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
        {
          isPublicPage ? (
            //@ts-ignore
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                {/*@ts-ignore*/}
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl={'http://localhost:3000/auth/login'} />
              </SignedOut>
            </>
          )
        }
      </Provider>
    </ClerkProvider>
  )
}
