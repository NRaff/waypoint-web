import '@/styles/global.css'
import type { AppProps } from 'next/app'

export default function WaypointWeb({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
