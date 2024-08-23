import { Header } from "@modules/common/components/header"
import mail from "../../../../../public/contactus/mail.png"
import phone from "../../../../../public/contactus/phone.png"
import fax from "../../../../../public/contactus/fax.png"
import office from "../../../../../public/contactus/office.png"
import { ContactsItem } from "@modules/contact-us/components/contacts-item"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6"
import { SlSocialFacebook } from "react-icons/sl"
import { PiTiktokLogo } from "react-icons/pi"
import { ContactusForm } from "@modules/contact-us/components/contact-us-form"

import Image from "next/image"
import Link from "next/link"

const ContactUsTemplate = () => {
  const contactUsItems = [
    {
      id: 1,
      title: "mail",
      value: "examplemail@gmail.com",
      bg: "#fff0e6",
      image: mail,
    },
    {
      id: 2,
      title: "phone",
      value: "+216 94077836",
      bg: "#ebeeff",
      image: phone,
    },
    {
      id: 3,
      title: "fax",
      value: "examplefax",
      bg: "#f4eefa",
      image: fax,
    },
    {
      id: 4,
      title: "bureau",
      value: "some address",
      bg: "#f4eefa",
      image: office,
    },
  ]
  console.log("test image", office.width)
  return (
    <div>
      <Header title="Contact us" />
      <div className="py-10 px-3 w-full flex justify-center ">
        <div className=" w-full max-w-[1160px]">
          <div className="w-full flex md:flex-row flex-col justify-between gap-x-2 gap-y-3">
            <div className=" md:w-1/2 md:pr-4">
              <div className=" text-neutral-900 font-bold text-2xl">
                Contactez-nous
              </div>
              <div className=" text-neutral-600 text-sm mt-2 font-semibold">
                Nous sommes là pour vous à chaque étape du processus. Que vous
                ayez des questions, que vous ayez besoin d'aide pour passer une
                commande ou que vous souhaitiez partager vos commentaires, notre
                sympathique équipe de support client est prête à vous aider.
                Notre équipe est là pour vous aider ! Contactez-nous via
              </div>
              <div className="flex flex-col gap-y-3 mt-6">
                {contactUsItems.map((item) => (
                  <ContactsItem key={item.id} item={item}>
                    {/* {item.image} */}
                    <Image
                      src={item.image.src}
                      width={item.image.width as number}
                      height={item.image.height as number}
                      alt={item.title as string}
                      //   objectFit="cover"
                    />
                  </ContactsItem>
                ))}
              </div>
              <div className="mt-6 text-2xl font-semibold text-neutral-900">
                Restez connecté
              </div>
              <div className="flex gap-x-2 mt-2">
                <Link href={""} className="p-2 rounded-full bg-secondary-200">
                  <AiOutlineInstagram color="#d09423" size={19} />
                </Link>
                <Link href={""} className="p-2 rounded-full bg-secondary-200">
                  <FaXTwitter color="#d09423" size={19} />
                </Link>
                <Link href={""} className="p-2 rounded-full bg-secondary-200">
                  <SlSocialFacebook color="#d09423" size={19} />
                </Link>
                <Link href={""} className="p-2 rounded-full bg-secondary-200">
                  <PiTiktokLogo color="#d09423" size={19} />
                </Link>
              </div>
            </div>
            <div className=" md:w-1/2  flex justify-center   ">
              <div className=" md:max-w-[460px] w-full bg-primary-500 p-5 rounded-3xl flex flex-col items-center gap-y-3">
                <div className=" text-white text-2xl">
                  Envoyez-nous un message
                </div>
                <div className="text-sm text-white">
                  votre adresse email ne sera pas publiée
                </div>
                <ContactusForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactUsTemplate
