"use client";

import { Heading } from "@/components/heading";

import { AccountFormSkeleton } from "@/features/cuentas/components/account-form-skeleton";
import { NotFound } from "@/components/not-found";

import { useGetTransaccion } from "@/features/transacciones/api/use-get-transaccion";
import { TransaccionForm } from "@/features/transacciones/components/trasacciones-fom";

const AcountPage = ({ params }: { params: { categoriaId: string } }) => {
  const { data, isLoading, isError } = useGetTransaccion(params.categoriaId);

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
          { label: "Transacciones", href: "/transacciones" },
          { label: data?.categoria?.nombre || "Editar", href: `/transacciones/${params.categoriaId}/editar` },
          { label: "Editar", href: `/transacciones/${params.categoriaId}/editar` },
        ]}
        title="Editar "
      />
      <TransaccionForm initialData={data} />
    </>
  );
};

export default AcountPage;