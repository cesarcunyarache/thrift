"use client";

import { Heading } from "@/components/heading";
import { AccountForm } from "@/features/cuentas/components/account-form";
import { AccountFormSkeleton } from "@/features/cuentas/components/account-form-skeleton";
import { NotFound } from "@/components/not-found";

import { useGetCuenta } from "@/features/cuentas/api/use-get-cuenta";

const AcountPage = ({ params }: { params: { cuentaId: string } }) => {
  const { data, isLoading, isError } = useGetCuenta(params.cuentaId);

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
          { label: "Cuentas", href: "/cuentas" },
          { label: data?.nombre || "Editar", href: `/cuentas/${params.cuentaId}/editar` },
          { label: "Editar", href: `/cuentas/${params.cuentaId}/editar` }
        ]}
        title="Editar Cuenta"
      />
      <AccountForm initialData={data} />
    </>
  );
};

export default AcountPage;