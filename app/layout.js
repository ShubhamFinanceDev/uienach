import Loader from "@/components/core/Loader"
import { Providers } from "@/redux/provider"


import "@/style/style.map.scss"

export const metadata = {
  title: 'Shubham Housing Finance',
  description: "Shubham Housing Finance we provide affordable housing loan with a hassle-free documentation process and easy EMI's options for the low-income segment",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
