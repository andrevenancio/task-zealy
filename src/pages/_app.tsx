import type { AppProps } from "next/app"

import { Application } from "@/components/application"

import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Application>
      <Component {...pageProps} />
    </Application>
  )
}
