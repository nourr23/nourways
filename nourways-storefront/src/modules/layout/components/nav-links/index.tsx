"use client"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ProductCategoryWithChildren } from "types/global"

export const NavLinks = ({
  categories,
}: {
  categories: ProductCategoryWithChildren[] | null
}) => {
  const currentPath = usePathname()
  return (
    <div className="flex gap-x-2 md:gap-x-6 items-center h-full">
      <LocalizedClientLink
        href="/"
        className={` ${
          currentPath === "/tn" ? "border-b-secondary-500 border-b" : ""
        } text-base lg:text-lg pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        Home
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/store"
        className={` ${
          currentPath === "/tn/store" || currentPath.includes("/tn/products/")
            ? "border-b-secondary-500 border-b"
            : ""
        } text-base lg:text-lg pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        Produits
      </LocalizedClientLink>
      <div className="relative group">
        <div
          className={` ${
            currentPath.includes("/tn/categories")
              ? "border-b-secondary-500 border-b"
              : ""
          } text-base lg:text-lg pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
          data-testid="nav-store-link"
        >
          catégories
        </div>
        <div className="absolute rounded min-w-full hidden px-3 bg-primary-500 py-4 group-hover:flex flex-col gap-y-3 left-0">
          {categories?.map((category: ProductCategoryWithChildren) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className={`hover:text-secondary-500 text-white text-base  whitespace-nowrap capitalize`}
              data-testid="nav-store-link"
            >
              {category.name}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
      <LocalizedClientLink
        href="/about-us"
        className={` ${
          currentPath === "/tn/about-us" ? "border-b-secondary-500 border-b" : ""
        } text-base lg:text-lg pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        about us
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/contact-us"
        className={` ${
          currentPath === "/tn/contact-us" ||
          currentPath.includes("/tn/contact-us/")
            ? "border-b-secondary-500 border-b"
            : ""
        } text-base lg:text-lg pb-1 px-1 hover:text-secondary-500 capitalize text-white`}
        data-testid="nav-store-link"
      >
        contact us
      </LocalizedClientLink>
    </div>
  )
}
