import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={500} height={6} showOnShallow={false}/>
    <Component {...pageProps} />
  </>)
}