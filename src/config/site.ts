export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "mixy://boos",
  description: "Robot Powered Mixes.",
  theme: {
    waveFormColor: "#FFFFFF",
    waveFormProgressColor: "#FF0000",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/mixyboos",
    github: "https://github.com/mixyboos",
    docs: "https://docs.mixyboos.com",
  },
};
