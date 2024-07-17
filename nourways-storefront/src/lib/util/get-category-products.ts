import { medusaClient } from "@lib/config"
import { StoreGetProductsParams, Region } from "@medusajs/medusa"
import { cache } from "react"

const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
}

const regionMap = new Map<string, Region>()

export const listRegions = cache(async function () {
  return medusaClient.regions
    .list()
    .then(({ regions }) => regions)
    .catch((err) => {
      console.log(err)
      return null
    })
})

const getRegion = cache(async function (countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      return null
    }

    regions.forEach((region: any) => {
      region.countries.forEach((c: any) => {
        regionMap.set(c.iso_2, region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us")

    return region
  } catch (e: any) {
    console.log(e.toString())
    return null
  }
})

export const getProductsList = cache(async function ({
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

  //   const transformedProducts = products.map((product) => {
  //     return transformProductPreview(product, region!)
  //   })

  const nextPage = count > pageParam + 1 ? pageParam + 1 : null

  return {
    response: { products, count },
    nextPage,
    queryParams,
  }
})
