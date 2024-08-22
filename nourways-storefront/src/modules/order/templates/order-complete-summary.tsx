"use client"
import { Heading } from "@medusajs/ui"
import Items from "@modules/order/components/items"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import { Order } from "@medusajs/medusa"
import { useState } from "react"
import Thumbnail from "@modules/products/components/thumbnail"
import LineItemPrice from "@modules/common/components/line-item-price"

type OrderCompletedTemplateProps = {
  order: Order
}

export const OrderCompleteSummary = ({
  order,
}: OrderCompletedTemplateProps) => {
  const [toggleItems, setToggleItems] = useState(false)
  return (
    <>
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
          <button
            onClick={() => setToggleItems((prev) => !prev)}
            className=" rounded-3xl bg-secondary-500 w-full py-2 text-white text-lg border-none outline-none"
          >
            {toggleItems
              ? "Masquer les Articles achetés"
              : "Voir les Articles achetés"}
          </button>
        </div>
      </div>

      {toggleItems && (
        <div className=" flex flex-col gap-y-2 w-full">
          {order.items.map((item, index) => (
            <div
              key={item.id}
              className={` ${
                index % 2 === 0 ? "bg-grey-0" : " bg-transparent"
              } flex w-full justify-between p-2 rounded-lg items-center`}
            >
              <div className="">
                <Thumbnail thumbnail={item.thumbnail} size="extra-small" />
              </div>
              <div className=" text-sm text-neutral-600 font-semibold capitalize">
                {item.title}
              </div>
              <div className=" text-neutral-600 text-sm">
                {item.quantity} {item.quantity > 1 ? "Aricles" : "Aricle"}
              </div>
              <div className=" text-neutral-600 text-sm">
                <LineItemPrice
                  item={item}
                  region={order.region}
                  style="tight"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
