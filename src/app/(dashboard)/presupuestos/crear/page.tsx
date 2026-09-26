"use client"

import { Heading } from "@/components/heading";
import { PresupuestoForm } from "@/features/presupuesto/components/presupuesto-fom";


const AcountPage = () => {
    return (
        <>
            <Heading
                items={[
                    { label: "Presupuestos", href: "/presupuestos" },
                    { label: "Crear", href: "/categorias/crear" }
                ]}
                title="Crear Presupuesto"
            />
            <PresupuestoForm />
        </>
    );
}

export default AcountPage;