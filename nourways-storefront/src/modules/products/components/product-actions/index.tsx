"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import { FaHeart, FaShoppingCart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"
import { LoadingAction } from "@modules/common/components/loading"
import { ProductQuantity } from "@modules/common/components/products-quantity"
import { WishListButton } from "../wishlist-button"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean
  buttonType: "icon" | "icon-outline" | "normal"
  wishlist?: Array<string>
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
  disabled,
  buttonType,
  wishlist,
}: ProductActionsProps) {
  const router = useRouter()
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [counter, setCounter] = useState(1)
  const [maxQuantity, setMaxQuantity] = useState(0)

  const countryCode = useParams().countryCode as string

  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [variant])

  useEffect(() => {
    variant?.inventory_quantity && setMaxQuantity(variant?.inventory_quantity)
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async (type: string) => {
    if (!variant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variant.id,
      quantity: counter,
      countryCode,
    })

    if (type === "buy") {
      router.push("/cart")
    }

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 " ref={actionsRef}>
        {buttonType !== "icon-outline" && buttonType !== "icon" && (
          <div className=" flex flex-col gap-y-4">
            {product.variants.length > 1 && (
              <div className="flex flex-col gap-y-4">
                {(product.options || []).map((option) => {
                  return (
                    <div key={option.id}>
                      <OptionSelect
                        option={option}
                        current={options[option.id]}
                        updateOption={updateOptions}
                        title={option.title}
                        data-testid="product-options"
                        disabled={!!disabled || isAdding}
                      />
                    </div>
                  )
                })}
                {/* <Divider /> */}
              </div>
            )}
            <div className="flex justify-start">
              {maxQuantity > 1 ? (
                <ProductQuantity
                  counter={counter}
                  setCounter={(c: number) => setCounter(c)}
                  maxQuantity={maxQuantity}
                />
              ) : null}
            </div>
          </div>
        )}

        <div className="">
          {/* {isAdding ? (
            <LoadingAction />
          ) : */}
          {buttonType == "icon" ? (
            <>
              <button
                onClick={() => handleAddToCart("")}
                disabled={!inStock || !variant || isAdding}
                className=" outline-none border-none h-[54px] w-[54px] flex justify-center items-center bg-white rounded-[27px]"
              >
                {isAdding ? (
                  <>
                    <LoadingAction />
                  </>
                ) : (
                  <FaShoppingCart color="#d09423" size={30} />
                )}
              </button>
            </>
          ) : buttonType == "icon-outline" ? (
            <button
              onClick={() => handleAddToCart("")}
              disabled={!inStock || !variant || isAdding}
              className=" outline-none border-none h-[44px] w-[44px] flex justify-center items-center bg-secondary-500 rounded-[22px]"
            >
              {isAdding ? (
                <>
                  <LoadingAction />
                </>
              ) : (
                <FaShoppingCart color="#fff" size={22} />
              )}
            </button>
          ) : (
            <div className=" flex gap-x-3 mt-4">
              <Button
                onClick={() => handleAddToCart("buy")}
                disabled={!inStock || !variant || !!disabled || isAdding}
                variant="primary"
                className=" px-7 bg-secondary-500 hover:bg-secondary-500 border-none shadow-none rounded-3xl h-10"
                isLoading={isAdding}
                data-testid="add-product-button"
              >
                {"Acheter"}
              </Button>
              <Button
                onClick={() => handleAddToCart("")}
                disabled={!inStock || !variant || !!disabled || isAdding}
                variant="primary"
                className=" text-xs sm:text-base px-7 bg-primary-500 hover:bg-primary-500 border-none shadow-none rounded-3xl h-10 whitespace-nowrap"
                isLoading={isAdding}
                data-testid="add-product-button"
              >
                {!variant
                  ? "Sélectionnez les options"
                  : !inStock
                  ? "En rupture de stock"
                  : "Ajouter au panier"}
              </Button>
              {product.id && (
                <WishListButton
                  product_id={product.id}
                  wishlist={wishlist}
                  product_details={true}
                />
              )}
            </div>
          )}
        </div>
        {/* <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={() => handleAddToCart("")}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        /> */}
      </div>
    </>
  )
}
