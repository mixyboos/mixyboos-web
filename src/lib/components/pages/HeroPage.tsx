import React from "react";
import LoginButton from "@/lib/components/widgets/LoginButton";
import { Icons } from "@/components/icons";
import { LinkButton } from "@/components/widgets/link-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    headline: "Most fun I've had with my clothes on",
    text: "Well.. since they discontinued Mr. Matey",
    from: "Fergal Moran",
    fromTitle: "World's most handsome man",
    fromAvatar: "https://i.pravatar.cc/150?img=43",
  },
  {
    headline: "Mmmmm.... human music",
    text: "I like it",
    from: "Ed Dunlea",
    fromTitle: "Minister for moaning",
    fromAvatar: "https://i.pravatar.cc/150?img=59",
  },
  {
    headline: "Lovely hurling",
    text: "Well, as lovely as hurling can be, which is to say not very.",
    from: "Adam Dunbar",
    fromTitle: "Hurler on the ditch",
    fromAvatar: "https://i.pravatar.cc/150?img=38",
  },
  {
    headline: "D'ya have the balla?",
    text: "You fucking do, g'wan and play it ya cunt!!",
    from: "Gangrene McDandruff",
    fromTitle: "Local crank",
    fromAvatar: "https://i.pravatar.cc/150?img=10",
  },
];
const HeroPage = () => {
  return (
    <div className="mt-8 px-4  lg:px-0 xl:px-32">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-accent-foreground sm:text-5xl sm:leading-none md:tracking-wide">
          Welcome to MixyBoos
        </h1>
        <p className="mb-6 text-lg font-normal text-muted-foreground sm:text-xl xl:px-80">
          A new way to create and share music with those you love
        </p>
        <div className="mx-auto flex max-w-fit space-x-2 rounded-lg p-1 sm:mt-8">
          <LinkButton size={"lg"} variant="default" href="/live/create">
            <Icons.record className="mr-2 h-5 w-5 rounded-full " />
            <span>Pre-record</span>
          </LinkButton>
          <LinkButton size={"lg"} href="/live/create" variant="default">
            <Icons.broadcast className="mr-2 h-5 w-5 rounded-full" />
            Go Live
          </LinkButton>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.from}>
            <CardHeader>
              <CardTitle className="text-xl font-medium leading-3">
                {t.headline}
              </CardTitle>
              <CardDescription className="text-sm">{t.text}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={t.fromAvatar} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{t.from}</p>
                  <p className="text-sm text-muted-foreground">{t.fromTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default HeroPage;
