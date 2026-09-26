"use client";

import { Heading } from "@/components/heading";

import { AccountFormSkeleton } from "@/features/cuentas/components/account-form-skeleton";
import { NotFound } from "@/components/not-found";


import { useGetPresupuesto } from "@/features/presupuesto/api/use-get-presupuesto";
import { PresupuestoForm } from "@/features/presupuesto/components/presupuesto-fom";

const AcountPage = ({ params }: { params: { presupuestoId: string } }) => {
  const { data, isLoading, isError } = useGetPresupuesto(params.presupuestoId);

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
          { label: "Presupuestos", href: "/presupuestos" },
          { label: data?.categoria.nombre || "Editar", href: `/presupuestos/${params.presupuestoId}/editar` },
          { label: "Editar", href: `/presupuestos/${params.presupuestoId}/editar` }
        ]}
        title="Editar Presupuesto"
      />
      <PresupuestoForm initialData={data} />
    </>
  );
};

export default AcountPage;