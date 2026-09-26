"use client";

import { Heading } from "@/components/heading";

import { AccountFormSkeleton } from "@/features/cuentas/components/account-form-skeleton";
import { NotFound } from "@/components/not-found";


import { useGetRecordatorio } from "@/features/recordatorios/api/use-get-recordatorio";
import { RecordatorioForm } from "@/features/recordatorios/components/recordatorio-fom";

const RecordatorioPage = ({ params }: { params: { recordatorioId: string } }) => {
  const { data, isLoading, isError } = useGetRecordatorio(params.recordatorioId);

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
          { label: "Recordatorios", href: "/recordatorios" },
          { label: data?.titulo || "Editar", href: `/recordatorio/${params.recordatorioId}/editar` },
          { label: "Editar", href: `/recordatorio/${params.recordatorioId}/editar` }
        ]}
        title="Editar Recordatorio"
      />
      <RecordatorioForm initialData={data} />
    </>
  );
};

export default RecordatorioPage;