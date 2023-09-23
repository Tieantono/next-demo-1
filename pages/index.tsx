import Image from 'next/image'
import { Inter } from 'next/font/google'
import Greeting, { AppDescription } from '@/components/Greeting'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <Greeting />
        <AppDescription></AppDescription>
        <br />
        <ul>
          <li>
            {/* DO NOT use <a> to navigate pages. */}
            <a href='about'>- About</a>
          </li>
          <li>
            <Link href={'test'}>- Test</Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
