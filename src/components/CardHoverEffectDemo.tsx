"use client";

import React from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { MdLockPerson } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TfiPieChart } from "react-icons/tfi";
import { LuCheckCircle2 } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import TypingAnimation from "../components/ui/typing-animation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { motion, useAnimation } from "framer-motion";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Descripción breve */}
      <div className="text-center mb-8">
        <TypingAnimation
          className="text-4xl font-bold text-black dark:text-white"
          text="Explora nuestras funcionalidades"
        />
        <p className="text-gray-600 mt-2">
          Descubre cómo estas herramientas pueden ayudarte a mejorar la gestión
          y organización de tus finanzas personales.
        </p>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Autenticación rápida y segura",
    description:
      "Accede a tu cuenta de manera segura y en segundos con Google, Facebook, Apple o correo electrónico.",
    icon: <MdLockPerson className="h-6 w-6 text-green-500" />, // Color verde
  },
  {
    title: "Gestión de cuentas simplificada",
    description:
      "Crea, actualiza y organiza todas tus cuentas en un solo lugar.",
    icon: <HiOutlineBanknotes className="h-6 w-6 text-blue-500" />, // Color azul
  },
  {
    title: "Gestión de categorías personalizable",
    description:
      "Clasifica tus transacciones en categorías como alimentación, transporte, entretenimiento, etc.",
    icon: <TfiPieChart className="h-6 w-6 text-orange-500" />, // Color naranja
  },
  {
    title: "Gestión de transacciones",
    description:
      "Registra cada gasto o ingreso de manera fácil y rápida, con la opción de clasificar según su tipo.",
    icon: <LuCheckCircle2 className="h-6 w-6 text-purple-500" />, // Color púrpura
  },
  {
    title: "Presupuestos inteligentes",
    description:
      "Configura y gestiona presupuestos por categorías, con opciones de recurrencia semanal, diaria, trimestral o mensual.",
    icon: <PiUsersThreeBold className="h-6 w-6 text-red-500" />, // Color rojo
  },
  {
    title: "ALertas y Recordatorios",
    description:
      "Notifica vencimientos de pagos o irregularidades en los flujos de efectivo",
    icon: <MdOutlineNotificationsActive className="h-6 w-6 text-black-500" />, // Color rojo
  },
];
