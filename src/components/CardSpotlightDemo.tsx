"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      {/* Encabezado */}

      <h2 className="text-3xl font-bold text-center mb-12">
        Beneficios del Sistema
      </h2>

      {/* Contenedor para las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Tarjeta 1 */}
        <CardSpotlight className="w-full bg-black p-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-white mb-2">
            Control total de tus finanzas
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Obtén una visión clara y completa de tu situación financiera en todo
            momento.
          </p>
        </CardSpotlight>

        {/* Tarjeta 2 */}
        <CardSpotlight className="w-full bg-black p-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-white mb-2">
            Automatización de presupuestos recurrentes
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Ahorra tiempo y mantén tus finanzas organizadas con presupuestos que
            se repiten automáticamente.
          </p>
        </CardSpotlight>

        {/* Tarjeta 3 */}
        <CardSpotlight className="w-full bg-black p-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-white mb-2">
            Notificaciones y recordatorios
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Mantente al día con tus obligaciones financieras y nunca pierdas una
            fecha importante.
          </p>
        </CardSpotlight>

        {/* Tarjeta 4 */}
        <CardSpotlight className="w-full bg-black p-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-white mb-2">
            Seguridad y privacidad
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Tus datos financieros están protegidos con los más altos estándares
            de seguridad y encriptación.
          </p>
        </CardSpotlight>
      </div>
    </div>
  );
}

/* const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-gray-300 text-sm">{title}</p>
    </li>
  );
}; *//* 

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
 */