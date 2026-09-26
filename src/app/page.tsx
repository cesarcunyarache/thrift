"use client";

import React from "react";
import { BackgroundBeamsWithCollisionDemo } from "../components/BackgroundBeamsWithCollisionDemo";

import { CardSpotlightDemo } from "../components/CardSpotlightDemo";
import { MarqueeDemo } from "../components/MarqueeDemo";
import CallToAction from "../components/callaction";
import Footer from "../components/footer";
import { NavbarDemo } from "../components/NavbarDemo";
import { CardHoverEffectDemo } from "../components/CardHoverEffectDemo";
import { MagicCardDemo } from "../components/MagicCardDemo";

function page() {
  return (
    <div className=" bg-background max-width:700px">
      <NavbarDemo />
      <div className="w-full">
        <BackgroundBeamsWithCollisionDemo>
          {""}
        </BackgroundBeamsWithCollisionDemo>
      </div>

      <Footer />
    </div>
  );
}

export default page;
