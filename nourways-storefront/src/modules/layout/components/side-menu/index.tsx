"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { AiOutlineMenu } from "react-icons/ai"
import { ProductCategoryWithChildren } from "types/global"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const SideMenuItems = {
  Home: "/",
  Produits: "/store",
  Catégories: "/catégories",
  Favorites: "/Favorites",
  Cart: "/cart",
  AboutUs: "/aboutUs",
  ContactUs: "/contactUs",
}

const SideMenu = ({
  regions,
  categories,
}: {
  regions: Region[] | null
  categories: ProductCategoryWithChildren[] | null
}) => {
  const toggleState = useToggleState()

  const [showCategories, setShowCategories] = useState(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className=" text-white relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <AiOutlineMenu color="white" size={26} />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                  >
                    <div>
                      <div className="flex justify-end" id="xmark">
                        <button data-testid="close-menu-button" onClick={close}>
                          <XMark />
                        </button>
                      </div>

                      <ul className="flex mt-2 flex-col gap-2 items-start justify-start">
                        {Object.entries(SideMenuItems).map(([name, href]) => {
                          return (
                            <li key={name} className=" w-full">
                              {name !== "Catégories" ? (
                                <LocalizedClientLink
                                  href={href}
                                  className="text-lg leading-10 hover:text-ui-fg-disabled"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                                >
                                  {name}
                                </LocalizedClientLink>
                              ) : (
                                <div className=" w-full">
                                  <div className=" w-full flex items-center justify-between">
                                    <button
                                      onClick={() =>
                                        setShowCategories((prev) => !prev)
                                      }
                                      className=" flex-1 text-left outline-none border-none text-lg leading-10"
                                    >
                                      {name}
                                    </button>
                                    <FaAngleDown color="white" size={24} />
                                  </div>
                                  {/* here */}
                                  {showCategories && (
                                    <div
                                      className={` ${
                                        showCategories
                                          ? "animate-fade-in-down"
                                          : "animate-fade-up"
                                      } flex flex-col  px-3 gap-y-2 border-l border-white`}
                                    >
                                      {categories?.map(
                                        (
                                          category: ProductCategoryWithChildren
                                        ) => (
                                          <LocalizedClientLink
                                            href={`/categories/${category.handle}`}
                                            className={`hover:text-secondary-500 text-white text-sm  whitespace-nowrap capitalize`}
                                            data-testid="nav-store-link"
                                            onClick={close}
                                          >
                                            {category.name}
                                          </LocalizedClientLink>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Medusa Store. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
