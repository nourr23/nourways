import { getProductsById } from "@lib/data"
import { Region } from "@medusajs/medusa"
import { WishlistCard } from "../wishlist-card"

const WishlistOverview = async ({
  wishlist,
  region,
}: {
  wishlist: Array<string>
  region: Region
}) => {
  const products = await getProductsById({ ids: wishlist, regionId: region.id })
  console.log("products from wishlist", products)
  return (
    <div className=" gap-y-3 flex flex-col">
      {wishlist &&
        wishlist.length > 0 &&
        products?.map((item: any) => (
          <WishlistCard
            wishlist={wishlist}
            product={item}
            key={item.id}
            region={region}
          />
        ))}
    </div>
  )
}
export default WishlistOverview
