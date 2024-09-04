import { Metadata } from "next"
import { getCustomer, listRegions } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Overview of your wishlist.",
}

export default async function WishList() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return <div className=" py-8 bg-yellow-500"> test</div>
}
