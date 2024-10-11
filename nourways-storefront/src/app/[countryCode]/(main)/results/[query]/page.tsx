import { Metadata } from "next"

import SearchResultsTemplate from "@modules/search/templates/search-results-template"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getProductsList } from "@lib/data"

export const metadata: Metadata = {
  title: "Search",
  description: "Explore all of our products.",
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { query, countryCode } = params
  const { sortBy, page } = searchParams

  const queryParams = { q: query }

  const productPreviews = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => console.log("response", ))

  return (
    <SearchResultsTemplate
      query={query}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
