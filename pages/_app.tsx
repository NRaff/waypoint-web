import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { useStore } from 'redux/store'
import { Provider } from 'react-redux'

export default function WaypointWeb({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
