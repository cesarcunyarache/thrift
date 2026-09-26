import React from "react";
import Image from "next/image";
import imagenes from "../imagenes/Logo-THIRFT.png";

const Hero: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 font-poppins">
      <nav className="relative bg-white dark:bg-gray-900">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between"></div>
        </div>
      </nav>

      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                ¿Qué <br /> es <span className="text-blue-500">THIRFT?</span>
              </h1>
              <p className="mt-3 mb-8 text-gray-600 dark:text-gray-400">
                {" "}
                {/* Añadido mb-8 */}
                THIRFT S.R.L es un sistema de gestión financiera enfocado en el
                registro de egresos e ingresos, con una serie de características
                clave que proporcionan una experiencia completa y eficiente para
                los usuarios al gestionar sus finanzas personales.
              </p>
            </div>
            <div className="lg:max-w-lg mt-10">
              {" "}
              {/* Añadido mt-10 */}
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                <span className="text-blue-500">MISIÓN</span>
              </h1>
              <p className="mt-5 text-gray-600 dark:text-gray-400">
                THIRFT S.R.L es un sistema de gestión financiera enfocado en el
                registro de egresos e ingresos, con una serie de características
                clave que proporcionan una experiencia completa y eficiente para
                los usuarios al gestionar sus finanzas personales.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 p-20">
            <Image
              src={imagenes}
              alt="Descripción de la imagen"
              className="w-70 h-70 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" // Añadido shadow-lg y transform
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
