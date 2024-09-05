"use client"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import { manageWishlist } from "@modules/account/actions"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import TrendingPrice from "@modules/products/components/trending-product/price"
import { IoCloseCircleOutline } from "react-icons/io5"

export const WishlistCard = ({
  product,
  region,
  wishlist,
}: {
  product: any
  region: Region
  wishlist?: Array<string>
}) => {
  const { cheapestPrice } = getProductPrice({
    product: product,
    region,
  })

  const removeFromwishList = async (product_id: any) => {
    if (wishlist) {
      const index = wishlist.indexOf(product_id)
      wishlist.splice(index, 1)

      await manageWishlist(wishlist)
    }
  }
  return (
    <div className=" flex bg-grey-0 py-2 px-4 rounded-md items-center gap-y-2 justify-between">
      {/* {product.title} */}
      <div className="flex gap-x-2 items-center w-1/2">
        <div className="w-[66px] h-[66px]">
          <Thumbnail thumbnail={product.thumbnail} size="extra-small" />
        </div>
        <div>
          <div className=" text-primary-500">{product.title}</div>
          <LineItemOptions
            variant={product.variants[0]}
            data-testid="product-variant"
          />
        </div>
      </div>

      <div className=" w-1/4">
        {cheapestPrice && (
          <TrendingPrice
            hideOldPrice={true}
            style=" text-neutral-500"
            price={cheapestPrice}
          />
        )}
      </div>
      <button onClick={() => removeFromwishList(product.id)}>
        <IoCloseCircleOutline className=" text-neutral-500" size={26} />
      </button>
    </div>
  )
}
