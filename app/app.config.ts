export default defineAppConfig({
  ui: {
    colors: { primary: "brand-primary", secondary: "brand-secondary" },
    container: { base: "w-full max-w-(--ui-container) mx-auto px-6 md:px-8 lg:px-10" },
    button: { slots: { base: "rounded-none" } },
    pageSection: { slots: { container: "py-10 sm:py-12 lg:py-15" } },
    input: { slots: { base: "rounded-none placeholder:text-sm", root: "w-full" }, defaultVariants: { size: "xl" } },
    select: { slots: { base: "rounded-none w-full placeholder:text-sm" }, defaultVariants: { size: "xl" } },
    textarea: { slots: { base: "rounded-none placeholder:text-sm", root: "w-full" }, defaultVariants: { size: "xl" } },
    formField: { slots: { root: "w-full" } },
    authForm: { slots: { input: "rounded-none placeholder:text-sm" }}
  },
  navItems: [
    { label: "Home", to: "/" },
    { label: "Articles", to: "/articles" },
    { label: "Our Services", to: "/services" },
    { label: "Gallery", to: "/gallery" },
    { label: "About Us", to: "/about-us" },
    { label: "Contacts", to: "/contact-us" }
  ],
  info: {
    email: "contact@anatarenigeria.org",
    phoneNumber: ["09169596959", "07067546592"],
    address: "Near Khayyaz Filling Station, Sani Abacha Byepass, Birnin Kebbi, Kebbi State",
    socialLinks: [
      { label: "Twitter Page Link", link: "/#", icon: "tabler:brand-x" },
      {
        label: "Facebook Page Link",
        link: "/#",
        icon: "tabler:brand-facebook"
      },
      {
        label: "Instagram Page Link",
        link: "/#",
        icon: "tabler:brand-instagram"
      }
    ]
  },
  site: {
    name: "Anatare Community Health and Enpowerment Initiative",
    url: "https://anatarenigeria.org",
    description: "The official website of Anatare Community Health and Enpowerment Initiative (ACHEI)"
  }
})
