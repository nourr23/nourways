"use client"

import { LineItem, Region } from "@medusajs/medusa"
import { Table, Text, clx } from "@medusajs/ui"

import CartItemSelect from "@modules/cart/components/cart-item-select"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { updateLineItem } from "@modules/cart/actions"
import Spinner from "@modules/common/icons/spinner"
import { useState } from "react"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ProductQuantity } from "@modules/common/components/products-quantity"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const Item = ({ item, region, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant.product

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        return err.message
      })
      .finally(() => {
        setUpdating(false)
      })

    message && setError(message)
  }

  return (
    <Table.Row
      className="w-full bg-grey-0 !border-b-0"
      data-testid="product-row"
    >
      <Table.Cell className="!pl-3 p-3 w-24">
        <LocalizedClientLink
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "w-[66px] h-[66px]": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="extra-small" />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className=" text-neutral-500 font-semibold text-xs xs:text-sm capitalize"
          data-testid="product-title"
        >
          {item.title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell className="hidden sm:table-cell">
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <ProductQuantity
              style={" bg-white"}
              buttonsStyle=" !bg-grey-0"
              maxQuantity={
                item.variant.inventory_quantity > 0
                  ? item.variant.inventory_quantity
                  : 10
              }
              counter={item.quantity}
              setCounter={(c: number) => changeQuantity(c)}
            />
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-3">
        <span
          className={clx("!pr-0 items-start", {
            "flex flex-col items-start h-full justify-center":
              type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
      <Table.Cell className=" p-4 !pr-4">
        <DeleteButton id={item.id} data-testid="product-delete-button" />
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
