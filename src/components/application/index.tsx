import { ReactNode } from "react"
import { Roboto } from "next/font/google"

const inter = Roboto({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
})

export function Application({ children }: { children?: ReactNode }) {
  return <main className={inter.className}>{children}</main>
}
