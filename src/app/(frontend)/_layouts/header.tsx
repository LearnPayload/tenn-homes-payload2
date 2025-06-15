"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"
export const Header = () => {
  return (
    <header>
      <div className="max-w-7xl flex h-16 items-center justify-between px-4 py-4 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden tablet:flex items-center gap-8 bg-background/50 px-6 py-2 rounded-full">
          <Link href="/search" className="text-sm font-medium text-primary hover:text-primary">
            LISTINGS
          </Link>
          <Link href="/about" className="text-sm font-medium text-primary hover:text-primary">
            ABOUT
          </Link>
          <Link href="/blog" className="text-sm font-medium text-primary hover:text-primary">
            BLOG
          </Link>
          <Link href="/contact" className="text-sm font-medium text-primary hover:text-primary">
            CONTACT
          </Link>
        </nav>

        <div className="hidden tablet:flex items-center gap-4">
          <div className="flex space-x-2">
            <Button variant="ghost" className="font-medium">
              Sign In
            </Button>
            <Button className="font-medium">Get Started</Button>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild className="tablet:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>TENN HOMES</SheetTitle>
              <SheetDescription>
                Tennessee Homes is a real estate company that specializes in selling and renting
                homes in Tennessee.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/listings"
                className="text-lg font-medium text-primary hover:text-primary"
              >
                LISTINGS
              </Link>
              <Link href="/about" className="text-lg font-medium text-primary hover:text-primary">
                ABOUT
              </Link>
              <Link href="/blog" className="text-lg font-medium text-primary hover:text-primary">
                BLOG
              </Link>
              <Link href="/contact" className="text-lg font-medium text-primary hover:text-primary">
                CONTACT
              </Link>
              <div className="flex flex-col gap-2 pt-4 ">
                <Button variant="link" className="w-full justify-start text-lg underline">
                  Sign In
                </Button>
                <Button className="w-full justify-start text-lg">Get Started</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
