import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-white">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
