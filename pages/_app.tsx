import { NextPageWithLayout } from '@/components/layouts/NextPageWithLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available.
  // ?? is the nullish coalescing operator operator.
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
