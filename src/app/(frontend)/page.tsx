import './styles.css'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-bold">Hello</h1>
        <Link href="/admin" className={buttonVariants({ variant: 'default' })}>
          Admin Panel
        </Link>
      </div>
    </div>
  )
}
