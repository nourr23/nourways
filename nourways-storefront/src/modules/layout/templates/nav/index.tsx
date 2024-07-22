import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { NavLinks } from "@modules/layout/components/nav-links"
import { FaRegUser } from "react-icons/fa"
import { BsHandbag } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  console.log("regions", regions && regions[0].countries[0].iso_2)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="absolute w-full h-20 mx-auto duration-200 bg-primary-500">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full sm:hidden flex">
              <SideMenu regions={regions} />
            </div>
            <div className="hidden font-bold sm:flex text-white capitalize text-lg md:text-3xl">
              LOGO
            </div>
          </div>

          <div className=" hidden sm:flex">
            <NavLinks />
          </div>
          <div className=" font-bold sm:hidden flex text-white capitalize text-lg md:text-3xl">
            LOGO
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="flex items-center gap-x-4 lg:gap-x-6 h-full">
              {/* {process.env.FEATURE_SEARCH_ENABLED && ( */}
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-white flex items-center"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                <button>
                  <BiSearch
                    color="white"
                    className=" text-[20px] lg:text-[27px]"
                  />
                </button>
              </LocalizedClientLink>
              {/* // )} */}

              <LocalizedClientLink
                className="hover:text-ui-fg-base text-white flex items-center"
                href="/"
                data-testid="nav-favorite-link"
              >
                <button>
                  <FaRegHeart
                    color="white"
                    className=" text-[19px] lg:text-[25px]"
                  />
                </button>
              </LocalizedClientLink>

              <div className="hidden sm:flex">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base text-white flex gap-2 relative flex items-center"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <BsHandbag
                        color="white"
                        className=" text-[20px] lg:text-[26px]"
                      />
                      {/* <div className="absolute text-white text-xs top-[-7px] right-[-6px] ">{`0`}</div> */}
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-white hidden sm:flex flex items-center"
                href="/account"
                data-testid="nav-account-link"
              >
                <button>
                  <FaRegUser
                    color="white"
                    className=" text-[20px] lg:text-[26px]"
                  />
                </button>
              </LocalizedClientLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
