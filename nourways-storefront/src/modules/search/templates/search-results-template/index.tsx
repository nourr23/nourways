import { Heading, Text } from "@medusajs/ui"
import Link from "next/link"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Header } from "@modules/common/components/header"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { FilterContainer } from "@modules/common/components/filter-container"

type SearchResultsTemplateProps = {
  query: string
  sortBy?: SortOptions
  page?: string
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  sortBy,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <>
      <div className="flex flex-col px-0 small:items-start py-6 ">
        <Header title="Résultats" />

        <div className="py-10 px-3 w-full flex justify-center ">
          <div className=" w-full max-w-[1160px]">
            <div className="flex w-full gap-x-6">
              <div className=" hidden md:block">
                <div className=" text-neutral-900 capitalize text-2xl">
                  option de filtre
                </div>
                <div className="mt-5">
                  <FilterContainer title={"Trier Par"}>
                    <RefinementList
                      sortBy={sortBy || "created_at"}
                      data-testid="sort-by-container"
                    />
                  </FilterContainer>
                </div>
              </div>

              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  q={query}
                  sortBy={sortBy || "created_at"}
                  page={pageNumber}
                  countryCode={countryCode}
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-start">
          <Text className="text-ui-fg-muted">Search Results for:</Text>
          <Heading>
            {decodeURI(query)} ({ids.length})
          </Heading>
        </div>
        <LocalizedClientLink
          href="/store"
          className="txt-medium text-ui-fg-subtle hover:text-ui-fg-base"
        >
          Clear
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col small:flex-row small:items-start p-6">
        {ids.length > 0 ? (
          <>
            <RefinementList sortBy={sortBy || "created_at"} search />
            <div className="content-container">
              <PaginatedProducts
                productsIds={ids}
                sortBy={sortBy}
                page={pageNumber}
                countryCode={countryCode}
              />
            </div>
          </>
        ) : (
          <Text className="ml-8 small:ml-14 mt-3">No results.</Text>
        )} */}
      </div>
    </>
  )
}

export default SearchResultsTemplate
