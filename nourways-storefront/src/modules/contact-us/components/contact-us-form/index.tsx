"use client"
import Input from "@modules/common/components/input"
export const ContactusForm = () => {
  return (
    <form className="w-full max-w-[400px] mt-2 flex flex-col gap-4">
      <div>
        <div className=" text-white mb-2">Nom</div>
        <Input
          label=""
          name="name"
          type="name"
          title="Enter a valid name address."
          autoComplete="name"
          data-testid="name-input"
          className=" bg-primary-300 h-[50px] w-full border-none text-base pl-4 outline-none rounded-lg text-white placeholder:text-white"
        />
      </div>
      <div>
        <div className=" text-white mb-2 capitalize">Adresse mail</div>
        <Input
          label=""
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          data-testid="email-input"
          className=" bg-primary-300 h-[50px] w-full border-none text-base pl-4 outline-none rounded-lg text-white placeholder:text-white"
        />
      </div>
      <div>
        <div className=" text-white mb-2 capitalize">numéro de téléphone</div>
        <Input
          label=""
          name="phone"
          type="phone"
          title="Enter a valid phone address."
          autoComplete="phone"
          data-testid="phone-input"
          className=" bg-primary-300 h-[50px] w-full border-none text-base pl-4 outline-none rounded-lg text-white placeholder:text-white"
        />
      </div>
      <div>
        <div className=" text-white mb-2">Message</div>
        <Input
          label=""
          name="phone"
          type="phone"
          title="Enter a valid phone address."
          autoComplete="phone"
          data-testid="phone-input"
          className=" bg-primary-300 h-[90px] w-full border-none text-base pl-4 outline-none rounded-lg text-white placeholder:text-white"
        />
      </div>
      <button
        type="submit"
        className=" w-full text-white rounded-full py-3 bg-secondary-500"
      >
        Submit
      </button>
    </form>
  )
}
