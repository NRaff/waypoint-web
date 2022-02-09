import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { useStore } from 'redux/store'
import { Provider } from 'react-redux'
import { setupFirebase } from 'firebaseUtil/setup_firebase'

export default function WaypointWeb({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  // setupFirebase()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
