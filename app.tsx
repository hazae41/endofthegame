import React, { ComponentType } from 'https://esm.sh/react'
import { Head, Import } from 'https://deno.land/x/aleph/mod.ts'

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="bitcoin.png" />
        <title>EndOfTheGame</title>
        <Import from="../style/index.less" />
      </Head>
      <Page {...pageProps} />
    </>
  )
}
