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


export function Header() {

  return (
    <>
      <div className="col-span-5 flex items-center text-5xl font-extrabold dark:text-white">
        Real property, Real Sense
      </div>
      <div className="col-span-5  text-2xl dark:text-white">
        <a
          className="group text-sky-600 transition duration-300"
          href="https://github.com/Lsimelus/real-calc-client"
          target="_blank"
          rel="noopener"
        >
          coded
        </a>{" "}
        by{" "}
        <a
          className="group text-sky-600 transition duration-300"
          href="https://www.lyndbergh.net/"
          target="_blank"
        >
          Lyndbergh Simelus{" "}
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
                <AvatarImage src="/prof.png" className="hover:bg-sky-700" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Hi!</SheetTitle>
                <SheetDescription>
                  The purpose of this site is to provide a seamless experience for users to calculate and visualize their mortgage and equity information prior to looking at property.
                  To learn more about the tech stack, future plans, and/or look at the code please visit this projects <a target="_blank" href="https://github.com/Lsimelus/real-calc-client" className="text-sky-600">GitHub page.</a>
                  To look at other various projects that I've created, please visit my <a target="_blank" href="https://github.com/Lsimelus" className="text-sky-600">GitHub profile</a> or my <a target="_blank" href="https://portfolio-orcin-theta-51.vercel.app/" className="text-sky-600">live portfolio website</a>.
                  <br />
                  <br />
                  If you want to connect with me please reach out via my email: <strong>Lsimelus@gmail.com</strong> and my <a  target="_blank" href="https://www.linkedin.com/in/lyndbergh-simelus/" className="text-sky-600">LinkedIn profile.</a>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
  );
}



