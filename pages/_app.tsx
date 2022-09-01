// import '@/styles/reset.css'
import '@/styles/global.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { setupFirebase } from 'config/setup_firebase'
import { useStore } from 'models/store';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';


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
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )
        }
      </Provider>
    </ClerkProvider>
  )
}
