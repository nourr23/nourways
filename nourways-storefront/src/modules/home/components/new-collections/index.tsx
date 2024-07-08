import { Region } from "@medusajs/medusa"
import { ProductCategoryWithChildren } from "types/global"

export default async function NewCollections({
  categories,
  region,
}: {
  categories: ProductCategoryWithChildren
  region: Region
}) {
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-full max-w-[1300px]">new coolleecctionss</div>
    </div>
  )
}
