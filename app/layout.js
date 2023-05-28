import Nav from '@/components/Nav';
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptopia',
  description: 'DIscovert & Share AI Prompt',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Nav />
        { children }
        </main>
        </Provider>
      </body>
    </html>
  )
}
