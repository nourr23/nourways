"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className=" lg:max-w-[360px] min-w-[278px] flex flex-col gap-y-4  rounded-lg overflow-hidden border border-grey-0 bg-grey-0">
      <Heading
        level="h2"
        className="text-sm bg-primary-500 text-white h-[48px] flex items-center pl-3"
      >
        Récapitulatif de la commande
      </Heading>
      {/* <Divider /> */}
      <CartTotals data={cart} />
      <DiscountCode cart={cart} />

      <div className="px-3 pb-5 flex justify-center">
        <LocalizedClientLink
          href={"/checkout?step=" + cart.checkout_step}
          data-testid="checkout-button"
        >
          <Button className=" px-6 sm:px-12 rounded-3xl h-10 bg-secondary-500 hover:bg-secondary-500 !border-0 shadow-none !outline-none">Go to checkout</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary
