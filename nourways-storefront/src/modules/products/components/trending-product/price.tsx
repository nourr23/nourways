import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default function TrendingPrice({
  price,
  style,
}: {
  price: PriceType
  style?: string
}) {
  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text className={`${style ? style : "text-white"}`} data-testid="price">
        {price.calculated_price}
      </Text>
    </>
  )
}
