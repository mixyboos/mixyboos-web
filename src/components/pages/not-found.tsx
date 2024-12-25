"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/widgets/link-button";
import { Icons } from "@/components/icons";

const MotionCard = motion(Card);
const MotionButton = motion(Button);

export default function NotFoundPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex justify-center p-4">
      <MotionCard
        className="w-full max-w-3xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative h-64 sm:h-80">
          <Image
            src="/img/404.jpeg?height=400&width=800"
            alt="404 Hero Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <CardContent className="p-6 text-center">
          <motion.h1 className="text-4xl font-bold mb-4" variants={itemVariants}>
            404 - Page Not Found
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-6"
            variants={itemVariants}
          >
            {"Oops! The page you're looking for doesn't exist."}
          </motion.p>
          <MotionButton asChild variants={itemVariants}>
            <LinkButton variant={"link"} href="/">
              <Icons.back />
              Return to Home
            </LinkButton>
          </MotionButton>
        </CardContent>
      </MotionCard>
    </div>
  );
}
