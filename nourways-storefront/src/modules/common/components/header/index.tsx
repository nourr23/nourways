export const Header = ({ title }: { title?: string }) => {
  return (
    <div className="w-full bg-primary-500 relative h-[200px] md:h-[260px] flex justify-center items-center overflow-hidden">
      <div className=" text-white font-bold text-xl md:text-3xl capitalize">
        {title}
      </div>
      <div className="absolute h-full w-full slider-bg opacity-[0.03] "></div>
    </div>
  )
}
