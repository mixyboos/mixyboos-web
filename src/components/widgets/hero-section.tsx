import React from "react";
import { LinkButton } from "./link-button";
import { type LucideIcon } from "lucide-react";

type HeroSectionProps = {
  title: string;
  description: string;
  imageSrc: string;
  actionHref: string;
  actionText: string;
  actionIcon?: React.ReactNode;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  imageSrc,
  actionHref,
  actionText,
  actionIcon,
}) => {
  return (
    <section className="">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight  md:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p className="mb-6 max-w-2xl font-light text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
            {description}
          </p>
          <LinkButton href={actionHref} variant="secondary" size={"lg"}>
            {actionIcon && actionIcon}
            {actionText}
          </LinkButton>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src={imageSrc} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
