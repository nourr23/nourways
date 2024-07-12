import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function TrendingPrice({ price }: { price: PriceType }) {
  console.log("cheapestPrice", price && price)
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
      <Text className={" text-white"} data-testid="price">
        {price.calculated_price}
      </Text>
    </>
  )
}
