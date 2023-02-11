// @refresh reload
import { Body, FileRoutes, Head, Html, Link, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { Routes } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { Toaster } from 'solid-toast'

import './assets/global.css'
import { ThemeProvider } from '@context/theme'

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <script defer src="https://service.watchthem.live/pixel/l77gs7ZIl7d5b9Zs" />
        <script src = '/analytics.js'/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S6CQMW5DNY"></script>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="manifest" href="/manifest.webmanifest" />
        <Meta name="description" content="Burn Unstoppable Rusty Neurons" />
        <Link rel="icon" href="/favicon.ico" type="image/png" sizes="16x16" />
        <Link rel="apple-touch-icon" href="/pwa-192x192.png" sizes="192x192" />
        <Meta name="theme-color" content="#202A37" />
        <Title>burn-rs</Title>
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <ThemeProvider>
              <Routes>
                <FileRoutes />
              </Routes>
              <Toaster
                position="top-right"
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: 'bg-white text-gray-400',
                  duration: 5000,
                }}
              />
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
}
