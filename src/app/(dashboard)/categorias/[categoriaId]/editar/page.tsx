"use client";

import { Heading } from "@/components/heading";

import { AccountFormSkeleton } from "@/features/cuentas/components/account-form-skeleton";
import { NotFound } from "@/components/not-found";

import { CategoryForm } from "@/features/categorias/components/category-form";
import { useGetCategoria } from "@/features/categorias/api/use-get-categoria";

const AcountPage = ({ params }: { params: { categoriaId: string } }) => {
  const { data, isLoading, isError } = useGetCategoria(params.categoriaId);

  if (isLoading) {
    return <AccountFormSkeleton />;
  }

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <>
      <Heading
        items={[
          { label: "Categorias", href: "/categorias" },
          { label: data?.nombre || "Editar", href: `/categorias/${params.categoriaId}/editar` },
          { label: "Editar", href: `/categorias/${params.categoriaId}/editar` }
        ]}
        title="Editar Categorias"
      />
      <CategoryForm initialData={data} />
    </>
  );
};

export default AcountPage;