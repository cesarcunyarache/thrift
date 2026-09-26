import React from "react";
import { MdLockPerson } from "react-icons/md";
import { TbUserDollar } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdManageAccounts } from "react-icons/md";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import GradualSpacing from "../components/ui/gradual-spacing";

const AwesomeComponentsSection: React.FC = () => {
  return (
    <section className="dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Explora <br /> nuestros beneficios
        </h1>
        <div className="mt-2">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
          <BentoGrid className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
            {features.map((feature, index) => (
              <BentoGridItem
                key={index}
                className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                title={
                  <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                    {feature.title}
                  </h1>
                }
                description={
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                }
                icon={
                  <span className="inline-block p-3 bg-blue-100 rounded-full dark:bg-blue-500">
                    {feature.icon}
                  </span>
                }
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Simplicidad en la gestión",
    description:
      "El sistema es fácil de entender y usar, sin la complejidad que puede presentar un sistema financiero más avanzado que incluye contabilidad, activos, pasivos, entre otros.",
    icon: <MdManageAccounts className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Control de efectivo",
    description:
      "Permite a los usuarios tener un control claro y directo sobre el dinero que entra y sale, lo que facilita la toma de decisiones y asegura que siempre haya suficiente liquidez para cubrir los gastos.",
    icon: <TbUserDollar className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Visualización de flujos",
    description:
      "Dashboard que va a mostrar gráficos y métricas claves como los ingresos totales, los egresos y el saldo disponible, lo que facilita la comprensión de la situación financiera en tiempo real.",
    icon: <RxDashboard className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Toma de decisiones financieras",
    description:
      "Al tener un seguimiento detallado de los ingresos y egresos, los usuarios pueden identificar patrones de gasto, ajustar sus hábitos y tomar decisiones que optimicen sus recursos.",
    icon: <MdLockPerson className="h-6 w-6 text-green-500" />, // Color verde
  },
];

export default AwesomeComponentsSection;
