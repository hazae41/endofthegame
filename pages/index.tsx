// deno-lint-ignore triple-slash-reference
/// <reference lib="dom" />

import { Import, useDeno } from 'https://deno.land/x/aleph/mod.ts'
import React, { useEffect, useRef, useState } from 'https://esm.sh/react'
import { Abortable, Abort } from "https://deno.land/x/abortable/mod.ts"

function urlOf(coin: string) {
  return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
}

export default function Home() {
  const [price, setPrice] = useState<number>()
  const [clicked, setClicked] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const aborter = new AbortController()

    retrieve(aborter.signal).then(setPrice)

    const i = setInterval(() => {
      retrieve(aborter.signal).then(setPrice)
    }, 1000)

    return () => {
      aborter.abort()
      clearInterval(i)
    }
  }, [])

  function click() {
    const { current } = audio
    if (!current) return

    setClicked(true)
    current.play()
  }

  async function retrieve(signal: AbortSignal) {
    const res = await fetch(urlOf("bitcoin"), { signal })
    const json = await res.json()
    const price = json["bitcoin"]["usd"]
    return Math.round(price)
  }

  return (<>
    <img
      className="img layer"
      src="nybg.jpg" />
    <div className="content layer">
      <img
        className="bitcoin-logo"
        src="bitcoin.png" />
      <div
        className="bigtext"
        children={price} />
    </div>
    <img
      className="img layer"
      src="rise.png" />
    <div className="bottom layer">
      <a
        className="fab"
        target="_blank"
        href="https://etherscan.io/address/0xc9aBBF5281800405030B39d6e2a34D55EbfdCD62">
        <img
          className="logo"
          src="ethereum.png" />
      </a>
      <a
        className="fab"
        target="_blank"
        href="https://github.com/hazae41/endofthegame">
        <img
          className="logo"
          src="github.svg" />
      </a>
    </div>
    {!clicked && (
      <div
        onClick={click}
        className="clicker layer" />
    )}
    <audio
      ref={audio}
      className="music"
      loop
      src="music.mp3" />
  </>)
}
