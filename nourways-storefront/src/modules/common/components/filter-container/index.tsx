export const FilterContainer = ({ children, title }: any) => {
  return (
    <div className="rounded-3xl border border-neutral-200 p-5 min-w-[260px] mt-4">
      <div className="  text-neutral-700 capitalize text-2xl">{title}</div>
      <div className="">{children}</div>
    </div>
  )
}
