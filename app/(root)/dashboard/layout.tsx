import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import Sider from './UIcompnents/Sider'
import NextTopLoader from 'nextjs-toploader';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dashboard',

}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">


            <body
                className={`${montserrat.className} `}>
                <NextTopLoader
                    color='#d4af37'
                />
                <Sider />
                <div >
                    {children}
                </div>
            </body>
        </html>
    )
}
