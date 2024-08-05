import { LineItem, Region } from "@medusajs/medusa"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div className=" x-global-bg overflow-x-scroll max-w-full px-2 sm:overflow-x-hidden pb-2">
      <div className=" min-w-[503px] sm:min-w-0">
        <Table className=" rounded-lg overflow-hidden  ">
          <Table.Header className="border-t-0">
            <Table.Row className=" bg-primary-500 text-white">
              <Table.HeaderCell className="!pl-3 capitalize">
                produit
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell className="hidden sm:table-cell">
                Prix
              </Table.HeaderCell>
              <Table.HeaderCell>Quantité</Table.HeaderCell>

              <Table.HeaderCell className="">Total</Table.HeaderCell>
              <Table.HeaderCell className=""></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className=" ">
            {items && region
              ? items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1
                  })
                  .map((item) => {
                    return <Item key={item.id} item={item} region={region} />
                  })
              : Array.from(Array(5).keys()).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
            <Table.Row className=" bg-grey-0 w-full max-h-2 !border-b-0">
              <Table.Cell className=" !h-4 !border-b-0"></Table.Cell>
              <Table.Cell className=" !h-4 !border-b-0"></Table.Cell>
              <Table.Cell className=" !h-4 !border-b-0"></Table.Cell>
              <Table.Cell className=" !h-4 !border-b-0"></Table.Cell>
              <Table.Cell className=" !h-4 !border-b-0"></Table.Cell>
              <Table.Cell className=" !h-4 !border-b-0 hidden sm:table-cell"></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ItemsTemplate
