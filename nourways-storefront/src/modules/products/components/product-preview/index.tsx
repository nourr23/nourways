import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import Image from "next/image"
import { CiHeart } from "react-icons/ci"
import ProductActions from "../product-actions"
import { WishListButton } from "../wishlist-button"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
  wishlist,
}: {
  productPreview: any
  isFeatured?: boolean
  region: Region
  wishlist?: Array<string>
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  // console.log("productPreview", productPreview)

  return (
    <div className=" mx-auto md:mx-0 max-w-[280px] min-w-[214px]">
      {/* <LocalizedClientLink
        href={`/products/${productPreview.handle}`}
        className="group w-full"
      > */}
      <div>
        <div
          data-testid="product-wrapper"
          className=" sm:h-[218px] w-full justify-between bg-grey-0 rounded-3xl flex flex-col items-center px-3 py-4 gap-2 overflow-hidden"
        >
          <div className=" w-full flex justify-between items-center">
            <div>
              {cheapestPrice && Number(cheapestPrice.percentage_diff) > 0 && (
                <div className=" h-[34px] min-w-[34px] flex justify-center items-center px-2 bg-primary-400 text-white rounded-3xl text-sm">
                  -{cheapestPrice.percentage_diff}%
                </div>
              )}
            </div>

            <WishListButton
              product_id={productPreview.id}
              wishlist={wishlist}
            />
          </div>
          <LocalizedClientLink
            href={`/products/${productPreview.handle}`}
            className="group "
          >
            <Image
              src={`${productPreview.thumbnail}`}
              width={130}
              height={140}
              objectFit="cover"
              alt={`${productPreview.thumbnail}`}
              className=" group-hover:scale-110 ease-in-out duration-450"
            />
          </LocalizedClientLink>

          <div className="flex txt-compact-medium mt-4 justify-between"></div>
        </div>
      </div>
      <div className="flex mt-3 justify-between w-full items-center">
        <div className=" h-full flex flex-col justify-between">
          <Text
            className=" text-neutral-800 capitalize text-ms font-bold"
            data-testid="product-title"
          >
            {productPreview.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>

        <div>
          <ProductActions
            region={region}
            product={productPreview}
            buttonType={"icon-outline"}
          />
        </div>
      </div>
    </div>
  )
}
