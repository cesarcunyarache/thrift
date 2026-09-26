"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { useRouter } from "next/navigation";
import TypingAnimation from "../components/ui/typing-animation";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { MarqueeDemo } from "./MarqueeDemo";
import CallToAction from "./callaction";
import { MdLockPerson } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TfiPieChart } from "react-icons/tfi";
import { LuCheckCircle2 } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TypewriterEffect, TypewriterEffectSmooth } from "../components/ui/typewriter-effect"; // Usamos la librería aquí

const words = [
  {
    text: "El",
  },
  {
    text: "conocimiento",
  },
  {
    text: "financiero",
  },
  {
    text: "es",
  },
  {
    text: "Poder.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export const projects = [
  {
    title: "Autenticación rápida y segura",
    description:
      "Accede a tu cuenta de manera segura y en segundos con Google, Facebook, Apple o correo electrónico.",
    icon: <MdLockPerson className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Gestión de cuentas simplificada",
    description:
      "Crea, actualiza y organiza todas tus cuentas en un solo lugar.",
    icon: <HiOutlineBanknotes className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Gestión de categorías personalizable",
    description:
      "Clasifica tus transacciones en categorías como alimentación, transporte, entretenimiento, etc.",
    icon: <TfiPieChart className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Gestión de transacciones",
    description:
      "Registra cada gasto o ingreso de manera fácil y rápida, con la opción de clasificar según su tipo.",
    icon: <LuCheckCircle2 className="h-6 w-6 text-purple-500" />,
  },
  {
    title: "Presupuestos inteligentes",
    description:
      "Configura y gestiona presupuestos por categorías, con opciones de recurrencia semanal, diaria, trimestral o mensual.",
    icon: <PiUsersThreeBold className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Alertas y Recordatorios",
    description:
      "Notifica vencimientos de pagos o irregularidades en los flujos de efectivo",
    icon: <MdOutlineNotificationsActive className="h-6 w-6 text-black-500" />,
  },
];

export const BackgroundBeamsWithCollisionDemo = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  // Define el texto completo
  const text = "El conocimiento financiero es poder.";

  return (
    <div className="h-auto max-w-7xl mx-auto">

      {/* Animación de máquina de escribir */}
      {/*  <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.5, // Duración más larga para suavizar la animación
          ease: "easeOut",
        }}
        className="flex flex-col gap-4 items-center justify-start" // Reducido margen inferior
      > */}

      <section id="inicio">

        <ContainerScroll
          titleComponent={
            <>
              {/*  <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1> */}

              <div className="flex flex-col items-center justify-center md:p-10 p-5">
                <TypewriterEffectSmooth
                  words={words}
                  className="mb-6 text-7xl"
                />
                <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mb-3">
                  Con nuestra plataforma, podrás gestionar tus cuentas,
                  presupuestos, y mucho más desde cualquier lugar.
                  Gestiona tus gastos e ingresos de manera sencilla y eficiente desde cualquier lugar con nuestra plataforma.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 mb-6">

                  <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    onClick={() => router.push("/sign-up")}
                  >
                    Únete ahora
                  </button>

                  <button className="w-40 h-10 rounded-xl bg-white text-black border text-sm transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    onClick={() => router.push("/sign-in")}
                  >
                    Inicia Sesión
                  </button>
                </div>
                {/*  <div className="w-full flex justify-center mb-16"></div> */}
              </div>
            </>
          }
        >
          {/* <motion.div
              animate={controls}
              initial={{ rotateX: -20, rotateY: -20, scale: 1 , }}
              whileHover={{ scale: 1.15 }}
              className="border-8 border-gray-800 rounded-3xl shadow-2xl p-4 bg-white dark:bg-gray-900"
            > */}
          <Image
            src="/imagenes/sistema.jpg"
            alt="Descripción de la imagen"
            height={720}
            width={1400}
            draggable={false}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
          />
          {/*  </motion.div> */}
        </ContainerScroll>
      </section>





      {/* Sección con efectos de texto y proyectos */}


      <section className="mx-auto  flex justify-center items-center max-w-7xl px-4 min-h-screen" id="caracteristicas">

        <div className="w-full max-w-7xl mx-auto px-4 py-6">
          {" "}
          {/* Reducido padding vertical */}
          <div className="max-w-5xl mx-auto text-center">
            {" "}
            {/* Reducido padding vertical */}
            <TypingAnimation
              className="text-xl sm:text-2xl font-bold text-black dark:text-white"
              text="Explora nuestras funcionalidades"
            />
            <p className="text-gray-600 mt-2 text-xs sm:text-sm">
              Descubre cómo estas herramientas pueden ayudarte a mejorar la
              gestión y organización de tus finanzas personales.
            </p>
          </div>

          <HoverEffect items={projects} />

        </div>

      </section>



      <section className="w-full max-w-7xl mx-auto px-4 py-6" id="testimonios">
        {" "}
        {/* Reducido padding vertical */}
        <MarqueeDemo />
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        {" "}
        {/* Reducido padding vertical */}
        <CallToAction />
      </div>

      {/* Renderizado de los hijos */}
      {children}
      {/*  </motion.div> */}
    </div>
  );
};
