import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-black/95 dark:bg-zinc-100 text-muted-foreground dark:text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">THRIFT</h3>
            <p className="">Control Financiero</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="">
                  Inico
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="">
                  Características
                </a>
              </li>
              <li>
                <a href="#testimonios" className="">
                  Testimonios
                </a>
              </li>
              
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <p className="">Piura - Perú</p>
            {/* <p className="text-gray-400">New York, NY 10001</p> */}
            <p className="">telefono: 456-7890</p>
            <p className="">Email: thift@finance.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="">
                <Facebook />
              </a>
              <a href="#" className="">
                <Twitter />
              </a>
              <a href="#" className="">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center ">
          <p>&copy; 2024 Thrift. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
