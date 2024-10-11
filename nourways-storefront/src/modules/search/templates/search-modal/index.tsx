"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { getProductsSearch } from "@lib/util/search-product"
import { debounce } from "lodash"
import { SearchResultCard } from "@modules/search/components/search-result-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

export default function SearchModal({ countryCode }: { countryCode: string }) {
  const [value, setValue] = useState<string>("")
  const [products, setProduct] = useState<Array<any>>([])
  const router = useRouter()
  const searchRef = useRef(null)

  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick)
    // cleanup
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back()
      }
    }
    window.addEventListener("keydown", handleEsc)

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (value.length > 2) {
      setProduct([])
      getProducts({ q: value, limit: 6 })
    }
    if (value.length === 0) {
      setProduct([])
    }
  }, [value])

  const getProducts = async (queryParams: any) => {
    await getProductsSearch({
      queryParams,
      countryCode,
    }).then(({ response }) => setProduct([...response.products]))
  }
  return (
    <div className="relative z-[75]">
      <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md opacity-100 h-screen w-screen" />
      <div className="fixed inset-0 px-2 sm:p-0" ref={searchRef}>
        <div className=" flex flex-col items-center w-full gap-y-8 pt-6">
          <div className=" items-center flex relative overflow-hidden h-12 border-neutral-500 border w-full max-w-[460px] bg-black/30 rounded-lg">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className=" w-full h-full absolute left-0 top-0 pl-3 bg-transparent text-white outline-none"
              placeholder="Search"
            />
            <div className="absolute right-0 px-3 active:scale-75 cursor-pointer">
              <IoIosSearch color="white" size={29} />
            </div>
          </div>

          {products.length > 0 && (
            <div className=" shadow-lg shadow-black/30 bg-white rounded p-1 md:p-3 w-full max-w-[460px]">
              <div className="  gap-1  grid grid-cols-2">
                {products.map((product: any) => (
                  <SearchResultCard key={product.id} product={product} />
                ))}
              </div>
              {products.length > 1 && (
                <div className="mt-3 w-full flex">
                  <LocalizedClientLink
                    href={`/results/${value}`}
                    className=" w-full"
                    passHref
                  >
                    <Button
                      className="w-full bg-primary-500 hover:bg-primary-500 shadow-none !border-none !outline-none rounded-full"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Plus de résultats
                    </Button>
                  </LocalizedClientLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
