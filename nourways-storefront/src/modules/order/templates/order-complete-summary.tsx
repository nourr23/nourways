"use client"
import { Heading } from "@medusajs/ui"
import Items from "@modules/order/components/items"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import { Order } from "@medusajs/medusa"

type OrderCompletedTemplateProps = {
  order: Order
}

export const OrderCompleteSummary = ({
  order,
}: OrderCompletedTemplateProps) => {
  //   console.log("order", order)
  return (
    <div
      className="flex w-full flex-col xsmall:w-[500px]  my-6 gap-4 max-w-4xl h-full rounded-lg pb-4 overflow-hidden border border-grey-0 bg-grey-0"
      data-testid="order-complete-container"
    >
      {/* <OrderDetails order={order} /> */}
      <Heading
        level="h2"
        className="text-sm w-full bg-primary-500 text-white h-[48px] flex items-center pl-3"
      >
        Résumé de la commande
      </Heading>
      {/* <Items items={order.items} region={order.region} /> */}
      <CartTotals data={order} />
      {/* <ShippingDetails order={order} />
      <PaymentDetails order={order} />
      <Help /> */}
      <div className="flex justify-between text-neutral-500 px-3">
        <span className=" ">Date</span>
        <div> {new Date(order.created_at).toLocaleDateString("en-GB")} </div>
      </div>
      <div className="flex justify-between text-neutral-500 px-3">
        <span className=" ">Articles achetés</span>
        <div> {order.items.length} </div>
      </div>
      <div className="px-3">
        <button className=" rounded-3xl bg-secondary-500 w-full py-2 text-white text-lg border-none outline-none">
          Voir les détails de la commande
        </button>
      </div>
    </div>
  )
}
