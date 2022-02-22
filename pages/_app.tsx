// import '@/styles/reset.css'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { useStore } from 'redux/store'
import { Provider } from 'react-redux'
import { setupFirebase } from 'firebaseUtil/setup_firebase'

export default function WaypointWeb({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  setupFirebase()
  return (
    <Provider store={store}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      <Component {...pageProps} />
    </Provider>
  )
}
