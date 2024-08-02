import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse max-w-[280px] min-w-[214px] h-[274px]">
      <Container className="aspect-[9/16] w-full bg-grey-0 bg-ui-bg-subtle h-[218px]" />
      <div className="flex justify-between items-center w-full text-base-regular mt-3">
        <div className=" h-full gap-y-2 flex flex-1 flex-col justify-between">
          <div className="w-2/5 h-6 bg-grey-0"></div>
          <div className="w-1/5 h-6 bg-grey-0"></div>
        </div>
        <div className=" h-[44px] w-[44px] rounded-[22px] bg-grey-0"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
