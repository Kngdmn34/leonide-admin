import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css';
import { EdgeStoreProvider } from './lib/edgestore';
import ToasterProvde from '@/context/ToasterProvider';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={montserrat.className}>

        <EdgeStoreProvider>
          <ToasterProvde />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
