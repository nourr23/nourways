import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      <Text
        className={clx("text-ui-fg-muted", {
          " text-neutral-800 text-sm font-bold tracking-tight": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted text-xs tracking-tight"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
    </>
  )
}
