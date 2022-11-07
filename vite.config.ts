import { defineConfig } from 'vite'
import solid from 'solid-start/vite'
// @ts-ignore
import staticMode from 'solid-start-static'
import tsconfigPaths from 'vite-tsconfig-paths'
import AutoImport from 'unplugin-auto-import/vite'
// @ts-ignore
import type { Options as AutoImportOptions } from 'unplugin-auto-import'


const autoImportOptions: Partial<AutoImportOptions> = {
  imports: [
    'solid-js',
    {
      '@solid-primitives/destructure': [
        'destructure',
      ],
      '@solid-primitives/i18n': [
        'useI18n',
        'createI18nContext',
      ],
      '@testing-library/user-event': [
        ['default', 'userEvent'],
      ],
      '@solidjs/meta': [
        'Title',
      ],
    },
  ],
}

export default defineConfig({
  plugins: [
    solid({ adapter: staticMode() }),
    tsconfigPaths(),
    AutoImport(autoImportOptions),
  ],
  build: {
    target: ['esnext'],
  },
  ssr: {
    noExternal: [
      '@motionone/solid',
      'motion',
      'solid-toast',
      '@lottiefiles/lottie-player',
    ],
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})
