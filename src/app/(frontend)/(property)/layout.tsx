import { Footer } from '../_layouts/footer'
import { Header } from '../_layouts/header'
import { PayloadAdminBar } from '@payloadcms/admin-bar'

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="bg-white">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
