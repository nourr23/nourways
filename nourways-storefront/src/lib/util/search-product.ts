import { medusaClient } from "@lib/config"
import { StoreGetProductsParams, Region } from "@medusajs/medusa"
import { cache } from "react"
import { getRegion } from "./get-category-products"

const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
}

const regionMap = new Map<string, Region>()

export const getProductsSearch = cache(async function ({
  pageParam = 0,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: StoreGetProductsParams
  countryCode: string
}): Promise<{
  response: { products: any[]; count: number }
  nextPage: number | null
  queryParams?: StoreGetProductsParams
}> {
  const limit = queryParams?.limit || 12

  const region = await getRegion(countryCode)

  if (!region) {
    return emptyResponse
  }

  const { products, count } = await medusaClient.products
    .list(
      {
        limit,
        offset: pageParam,
        region_id: region.id,
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then((res) => res)
    .catch((err) => {
      throw err
    })


  const nextPage = count > pageParam + 1 ? pageParam + 1 : null
  return {
    response: { products, count },
    nextPage,
    queryParams,
  }
})
