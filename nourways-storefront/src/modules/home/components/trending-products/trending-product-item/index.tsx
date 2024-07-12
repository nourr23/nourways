// import { CiHeart } from "react-icons/ci"
// import { FaHeart, FaShoppingCart } from "react-icons/fa"
// import Image from "next/image"

// export const TrendingProductsItem = ({ item }: any) => {
//   console.log("item.thumbnail", item.thumbnail)
//   return (
//     <div className=" bg-grey-0 min-w-[331px] max-w-[380px] w-[32%]  flex flex-col justify-between mt-3 rounded-3xl overflow-hidden">
//       <div className="p-6 w-full">
//         <div className=" w-full flex justify-between items-center">
//           <div className=" h-[45px] flex justify-center items-center px-3 bg-primary-500 text-white rounded-3xl">
//             -20%
//           </div>
//           <button className=" outline-none border-none h-[45px] w-[45px] flex justify-center items-center bg-white rounded-[23px]">
//             <CiHeart color="#2d5356" size={36} />
//           </button>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <div className="  w-[200px] my-3 ">
//             <Image
//               src={`${item && item.thumbnail}`}
//               width={200}
//               height={200}
//               objectFit="cover"
//               alt={item.title}
//               className={`w-[200px] md:w-[200px] `}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="py-5 bg-primary-500 w-full rounded-2xl">
//         <div className="flex justify-between px-6 items-center">
//           <div className=" text-white text-lg capitalize">
//             <div>{item.title}</div>
//             <div>
//               {item.price.calculated_price && item.price.calculated_price}
//             </div>
//           </div>
//           <button className=" outline-none border-none h-[54px] w-[54px] flex justify-center items-center bg-white rounded-[27px]">
//             <FaShoppingCart color="#d09423" size={30} />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
