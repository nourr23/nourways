import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import RefinementList from "@modules/store/components/refinement-list"

const PRODUCT_LIMIT = 4

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string[]
  productsIds?: string[]
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = categoryId
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div>
      <div className="flex w-full items-center justify-between h-[48px]">
        <div className=" text-neutral-600 capitalize text-base md:text-xl  flex items-center">
          {page == totalPages ? (
            <>
              {count % PRODUCT_LIMIT}{" "}
              {count % PRODUCT_LIMIT > 1 ? "résultats" : "résultat"}
            </>
          ) : count > PRODUCT_LIMIT ? (
            <>
              1-{PRODUCT_LIMIT} sur {count} résultats
            </>
          ) : (
            <>
              {count} {count > 1 ? "résultats" : "résultat"}
            </>
          )}
        </div>
        <div className="">
          <div className="block md:hidden">
            <RefinementList
              sortBy={sortBy || "created_at"}
              data-testid="sort-by-container"
            />
          </div>
        </div>
      </div>

      <ul
        className="grid grid-cols-1 mt-5 w-full sm:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview productPreview={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
