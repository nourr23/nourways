"use client"

import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React from "react"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="flex flex-col text-neutral-500 gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between px-3">
          <span className="flex gap-x-1 items-center text-neutral-500">
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          {subtotal && (
            <span
              data-testid="cart-subtotal"
              className="text-neutral-500"
              data-value={subtotal / 10 || 0}
            >
              {getAmount(subtotal / 10)}
            </span>
          )}
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between px-3 text-neutral-500">
            <span>Discount</span>

            <span
              className=" text-secondary-500"
              data-testid="cart-discount"
              data-value={discount_total / 10 || 0}
            >
              - {getAmount(discount_total / 10)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between px-3 text-neutral-500">
          <span>Expédition</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {getAmount(shipping_total)}
          </span>
        </div>
        <div className="flex justify-between text-neutral-500 px-3">
          <span className="flex gap-x-1 items-center ">Impôts</span>
          {tax_total && (
            <span data-testid="cart-taxes" data-value={tax_total / 10 || 0}>
              {getAmount(tax_total / 10)}
            </span>
          )}
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total / 10 || 0}
            >
              - {getAmount(gift_card_total / 10)}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center my-1 py-1 justify-between text-neutral-500 mb-2 txt-medium bg-white px-3 ">
        <span>Total</span>
        {total && (
          <span
            className="txt-xlarge-plus"
            data-testid="cart-total"
            data-value={total / 10 || 0}
          >
            {getAmount(total / 10)}
          </span>
        )}
      </div>
      {/* <div className="h-px w-full border-b border-gray-200 mt-4" /> */}
    </div>
  )
}

export default CartTotals
