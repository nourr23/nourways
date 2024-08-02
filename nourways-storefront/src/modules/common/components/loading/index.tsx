export const LoadingAction = () => {
  return (
    <div className=" w-[54px] h-[54px] animate-ring overflow-hidden rounded-[27px] items-center justify-center flex bg-white">
      <div className="absolute w-[12px] top-[17px] animate-enter left-[12px] rounded-[6px] h-[12px] bg-secondary-500 "></div>
      <div className="absolute w-[12px] top-[17px] animate-accordion-up left-[29px] rounded-[6px]   h-[12px] bg-secondary-500 "></div>
      <div className="absolute w-[12px] top-[34px] animate-accordion-down left-[23px] rounded-[6px]   h-[12px] bg-secondary-500 "></div>
    </div>
  )
}
