"use client"

import { Heading } from "@/components/heading";
import { AccountForm } from "@/features/cuentas/components/account-form";

const AcountPage = () => {
    return (
        <>
            <Heading
                items={[
                    { label: "Cuentas", href: "/cuentas" },
                    { label: "Crear", href: "/cuentas/crear" }
                ]}
                title="Crear Cuenta"
            />
            <AccountForm />
        </>
    );
}

export default AcountPage;