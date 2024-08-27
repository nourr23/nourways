import AboutUsTemplate from "@modules/about-us/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About us",
  description: "about us page",
}

export default function AboutUs() {
  return <AboutUsTemplate />
}
