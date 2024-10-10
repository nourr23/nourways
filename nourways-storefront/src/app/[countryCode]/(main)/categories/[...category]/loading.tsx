import Spinner from "@modules/common/icons/spinner"

export default function Loading() {
  return (
    <div className=" min-w-[400px] w-full flex items-center justify-center">
      <Spinner />
    </div>
  )
}
