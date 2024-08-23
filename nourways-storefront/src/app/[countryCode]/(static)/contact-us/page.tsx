import ContactUsTemplate from "@modules/contact-us/templates/contact-us-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact us",
  description: "contact us page",
}

export default function ContactUs() {
  return <ContactUsTemplate />
}
