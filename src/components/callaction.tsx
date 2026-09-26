import React from "react";

const CallToAction: React.FC = () => {
  return (

    <>
      <section className="w-full flex justify-center items-center px-4">
        <div className="py-8 px-4 max-w-screen-xl flex justify-center items-center sm:py-16 lg:px-6">
          <div className="text-center flex flex-col justify-center items-center w-full max-w-2xl">
            <h2 className="mb-4 text-center text-4xl font-extrabold text-gray-900 dark:text-white sm:text-3xl xs:text-2xl">
              ¿Listo para llevar tu gestión financiera al siguiente nivel?
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg sm:text-base xs:text-sm">
              Obtén acceso exclusivo a nuestras innovadoras herramientas de
              gestión financiera y únete a la lista de espera hoy mismo.
            </p>
            <a
              href="/sign-up"
              className="text-white dark:bg-white dark:text-black bg-black font-medium rounded-full text-sm px-5 py-2.5 focus:outline-none hover:bg-gray-800 sm:px-4 sm:py-2 xs:px-3 xs:py-1 xs:text-xs"
            >
              Empieza Ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
