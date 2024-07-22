"use client"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const NavLinks = () => {
  const currentPath = usePathname()
  console.log("regions", currentPath)
  return (
    <div className="flex gap-x-2 md:gap-x-8 items-center h-full">
      <LocalizedClientLink
        href="/"
        className={` ${
          currentPath === "/tn" ? "border-b-secondary-500 border-b" : ""
        } text-base lg:text-xl pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        Home
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/store"
        className={` ${
          currentPath === "/tn/store" ? "border-b-secondary-500 border-b" : ""
        } text-base lg:text-xl pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        Produits
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/categories"
        className={` ${
          currentPath === "/tn/categories"
            ? "border-b-secondary-500 border-b"
            : ""
        } text-base lg:text-xl pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        catégories
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/aboutUs"
        className={` ${
          currentPath === "/tn/aboutus" ? "border-b-secondary-500 border-b" : ""
        } text-base lg:text-xl pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        about us
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/contactUs"
        className={` ${
          currentPath === "/tn/contactus"
            ? "border-b-secondary-500 border-b"
            : ""
        } text-base lg:text-xl pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        contact us
      </LocalizedClientLink>
    </div>
  )
}
