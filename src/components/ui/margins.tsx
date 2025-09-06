"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatBot } from "../questions/chatBot";

// Constants
const TITLE = "Real property, Real Sense";
const GITHUB_CLIENT_URL = "https://github.com/Lsimelus/real-calc-client";
const AUTHOR_NAME = "Lyndbergh Simelus";
const AVATAR_SRC = "/prof.png";
const AVATAR_FALLBACK = "Chat Bot";
const SHEET_TITLE = "Hi!";
const SHEET_DESCRIPTION = `The purpose of this site is to provide a seamless experience for
users to calculate and visualize their mortgage and equity
information prior to looking at property. To learn more about the
tech stack, future plans, and/or look at the code please visit this
projects `;
const GITHUB_PAGE_URL = "https://github.com/Lsimelus/real-calc-client";
const GITHUB_PROFILE_URL = "https://github.com/Lsimelus";
const PORTFOLIO_URL = "https://portfolio-orcin-theta-51.vercel.app/";
const EMAIL = "Lsimelus@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/lyndbergh-simelus/";

export function Header() {
  return (
    <>
      <div className="col-span-5 flex items-center text-5xl font-extrabold dark:text-white">
        {TITLE}
      </div>
      <div className="col-span-5  text-2xl dark:text-white">
        <a
          className="group text-sky-600 transition duration-300"
          href={GITHUB_CLIENT_URL}
          target="_blank"
          rel="noopener"
        >
          coded
        </a>{" "}
        by{" "}
        <a
          className="group text-sky-600 transition duration-300"
          href={PORTFOLIO_URL}
          target="_blank"
        >
          {AUTHOR_NAME}{" "}
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
        </a>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src={AVATAR_SRC} className="hover:bg-sky-700" />
          <AvatarFallback>{AVATAR_FALLBACK}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="p-3 m-1">
        <SheetHeader className="z-20 relative">
          <SheetTitle>{SHEET_TITLE}</SheetTitle>
          <SheetDescription>
            {SHEET_DESCRIPTION}
            <a target="_blank" href={GITHUB_PAGE_URL} className="text-sky-600">
              GitHub page.
            </a>
            To look at other various projects that I've created, please visit my{" "}
            <a
              target="_blank"
              href={GITHUB_PROFILE_URL}
              className="text-sky-600"
            >
              GitHub profile
            </a>{" "}
            or my{" "}
            <a target="_blank" href={PORTFOLIO_URL} className="text-sky-600">
              live portfolio website
            </a>
            .
            <br />
            <br />
            If you want to connect with me please reach out via my email:{" "}
            <strong>{EMAIL}</strong> and my{" "}
            <a target="_blank" href={LINKEDIN_URL} className="text-sky-600">
              LinkedIn profile.
            </a>
          </SheetDescription>
        </SheetHeader>
        <ChatBot />
      </SheetContent>
    </Sheet>
  );
}
