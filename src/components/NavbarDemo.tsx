"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, PieChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

interface NavbarProps {
  className?: string;
}

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar({ }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyles, setIndicatorStyles] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [ "Inicio", "Caracteristicas", "Testimonios"];

  const handleMouseEnter = (index: number) => {
    const linkElement = linksRef.current[index];
    if (linkElement) {
      const { offsetLeft, offsetWidth } = linkElement;
      setIndicatorStyles({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setIndicatorStyles((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      className={cn(
        "fixed top-0 max-w-6xl inset-x-0 z-50 flex items-center justify-between px-10 lg:px-16 mx-auto  ",
        isScrolled
          ? "py-2 rounded-full backdrop-blur-md bg-white/80  dark:bg-black/80 border mt-4"
          : "py-6 bg-transparent"
      )}
      style={{
        width: isScrolled ? "80%" : "100%",
        transition: "width 0.4s ease-in-out",
      }}
    >
      {/* Logo y menú */}
      <div className="flex items-center  lg:w-auto space-x-3">
        <div className="p-1 rounded-lg border flex items-center justify-center">
          <PieChart className="size-4 cursor-pointer" />
        </div>
        <a href="#startup" className="text-lg font-semibold ">
          THIRFT
        </a>
      </div>


      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="lg:hidden" >
            <Menu className="size-4 cursor-pointer" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              {/*   <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}



              <div className="flex flex-col w-full justify-center items-center gap-2 text-sm">

                {navLinks.map((link, index) => (

                  <DrawerClose asChild key={index}>
                    <Button variant="ghost" className="w-full" onClick={() => router.push(`#${link.toLowerCase()}`)}>{link}</Button>
                  </DrawerClose>

                ))}
              </div>
            </DrawerHeader>
            <DrawerFooter>
            
              <DrawerClose asChild>
                <Button  variant="outline"  onClick={() => router.push("/sign-in")} >Inicia Sesión</Button>
              </DrawerClose>
 

              <DrawerClose asChild>
                <Button  className="bg-black dark:bg-white dark:text-black hover:bg-black/70" onClick={() => router.push("/sign-up")}>  Regístrate</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>




      {/* Enlaces de navegación */}
      <div className="hidden lg:flex relative justify-center items-center space-x-10 text-sm">
        {/* Indicador Movible */}
        <div
          className="absolute bottom-[-12px] h-2 bg-gray-200 rounded-full transition-all duration-300 ease-in-out"
          style={{
            ...indicatorStyles,
          }}
        ></div>

        {/* Enlaces de navegación */}
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={`#${link.toLowerCase()}`}
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            className="hover:text-gray-900 dark:hover:text-gray-300 relative z-10 transition-all duration-300 ease-in-out lg:inline-block hidden"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Botones de acción */}
      <div className=" hidden lg:flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.push("/sign-in")}
        >
          Iniciar Sesión
        </Button>
        <Button
          className="bg-black hover:bg-black/70 dark:bg-white dark:hover:bg-white/70"
         
          onClick={() => router.push("/sign-up")}
        >
          Regístrate
        </Button>
      </div>
    </div>
  );
}
