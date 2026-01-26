import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Assaf Bitton | Quantitative Finance & Analytics',
  description: 'Portfolio of Assaf Bitton - Quantitative Finance Student at Baruch College specializing in Statistics, Risk Analytics, and Data Science.',
  keywords: ['quantitative finance', 'statistics', 'data analytics', 'risk analysis', 'Baruch College', 'Assaf Bitton'],
  authors: [{ name: 'Assaf Bitton' }],
  openGraph: {
    title: 'Assaf Bitton | Quantitative Finance & Analytics',
    description: 'Portfolio showcasing research in predictive modeling, statistical analysis, and quantitative finance.',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
