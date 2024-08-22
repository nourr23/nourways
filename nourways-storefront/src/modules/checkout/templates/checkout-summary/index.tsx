import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"
import PaymentButton from "@modules/checkout/components/payment-button"

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (!cart) {
    return null
  }

  return (
    <div className="lg:max-w-[360px] min-w-[278px] flex flex-col gap-y-4  rounded-lg overflow-hidden border border-grey-0 bg-grey-0 ">
      <Heading
        level="h2"
        className="text-sm bg-primary-500 text-white h-[48px] flex items-center pl-3"
      >
        Récapitulatif de la commande
      </Heading>
      <CartTotals data={cart} />
      {/* <ItemsPreviewTemplate region={cart?.region} items={cart?.items} /> */}
      <div className="my-6">
        <DiscountCode cart={cart} />
      </div>
      <div className="px-3 pb-5 flex justify-center">
        <PaymentButton cart={cart} data-testid="submit-order-button" />
      </div>
    </div>
  )
}

export default CheckoutSummary
