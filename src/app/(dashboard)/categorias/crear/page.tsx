"use client"

import { Heading } from "@/components/heading";
import { CategoryForm } from "@/features/categorias/components/category-form";


const AcountPage = () => {
    return (
        <>
            <Heading
                items={[
                    { label: "Categorias", href: "/categorias" },
                    { label: "Crear", href: "/categorias/crear" }
                ]}
                title="Crear Categoria"
            />
            <CategoryForm />
        </>
    );
}

export default AcountPage;