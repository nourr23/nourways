import { Header } from "@modules/common/components/header"
import Image from "next/image"
import about_us_bg from "../../../../public/about-us/about-us-bg.png"

const AboutUsTemplate = () => {
  return (
    <div>
      <Header title="About us" />
      <div className="py-10 px-3 w-full flex justify-center ">
        <div className="w-full max-w-[1160px] flex flex-col items-center">
          <div className=" text-neutral-900 text-2xl xsmall:text-3xl font-semibold w-full text-center">
            Découvrez FurniTunis
          </div>
          <div className=" w-full max-w-[700px] mt-8  rounded-2xl overflow-hidden">
            <Image
              src={about_us_bg.src}
              width={700}
              height={about_us_bg.height as number}
              alt={"about us bg"}
              objectFit="cover"
            />
          </div>

          <div className=" w-full max-w-[500px]  justify-center flex-col mt-8 gap-y-6 flex">
            <div>
              <div className="  xsmall:text-2xl text-xl font-semibold text-neutral-900 mb-2">
                Depuis des débuts modestes
              </div>
              <div className=" text-neutral-600 text-sm  xsmall:text-base">
                Notre histoire a commencé en 2023, animée par la passion de
                créer des meubles beaux et confortables. Ce qui a commencé comme
                une modeste opération est devenu une marque appréciée et connue
                pour sa qualité.
              </div>
            </div>

            <div>
              <div className="  xsmall:text-2xl text-xl font-semibold text-neutral-900 mb-2">
                Notre portée
              </div>
              <div className=" text-neutral-600 text-sm  xsmall:text-base">
                Aujourd'hui, FurniTunis sert des clients dans toute la Tunisie.
                Avec des centres de distribution situés dans des endroits clés,
                nous veillons à ce que nos meubles de haute qualité arrivent
                chez vous de manière efficace et sûre. Notre présence témoigne
                de l’amour et du soutien de nos clients, qui nous inspirent à
                poursuivre notre projet.
              </div>
            </div>

            <div>
              <div className="  xsmall:text-2xl text-xl font-semibold text-neutral-900 mb-2">
                Regarder vers l'avenir
              </div>
              <div className=" text-neutral-600 text-sm  xsmall:text-base">
                Alors que nous regardons vers l’avenir, notre objectif reste le
                même : créer des meubles qui allient style, confort et
                durabilité. Nous sommes enthousiasmés par le nouveau design et
                les innovations que nous vous proposons, et nous nous engageons
                à faire de votre maison un endroit magnifique, confortable et
                heureux.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutUsTemplate
