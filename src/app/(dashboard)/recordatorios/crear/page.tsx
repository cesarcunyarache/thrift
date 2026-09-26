"use client"

import { Heading } from "@/components/heading";
import { RecordatorioForm } from "@/features/recordatorios/components/recordatorio-fom";


const AcountPage = () => {
    return (
        <>
            <Heading
                items={[
                    { label: "Recordatorios", href: "/recordatorios" },
                    { label: "Crear", href: "/recordatorios/crear" }
                ]}
                title="Crear Recordatorio"
            />
            <RecordatorioForm />
        </>
    );
}

export default AcountPage;