import { getRegion } from "@lib/data"
import SearchModal from "@modules/search/templates/search-modal"

export default async function SearchModalRoute({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return <SearchModal countryCode={countryCode} />
}
