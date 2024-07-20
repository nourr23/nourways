import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default function TrendingPrice({
  price,
  style,
  hideOldPrice,
}: {
  price: PriceType
  style?: string
  hideOldPrice?: boolean
}) {
  return (
    <>
      <Text className={`${style ? style : "text-white"}`} data-testid="price">
        {price.calculated_price}
      </Text>
      {price.price_type === "sale" && !hideOldPrice && (
        <Text
          className="text-neutral-500 line-through text-sm sm:text-base text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
    </>
  )
}
