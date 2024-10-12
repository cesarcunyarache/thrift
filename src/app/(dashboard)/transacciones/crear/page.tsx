"use client"

import { Heading } from "@/components/heading";
import { TransaccionForm } from "@/features/transacciones/components/trasacciones-fom";


const AcountPage = () => {
    return (
        <>
            <Heading
                items={[
                    { label: "Transacciones", href: "/transacciones" },
                    { label: "Crear", href: "/transacciones/crear" },
                ]}
                title="Crear Transacción"
            />
            <TransaccionForm />
        </>
    );
}

export default AcountPage;