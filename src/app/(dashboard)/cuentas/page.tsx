"use client"

import { format } from "date-fns";


import { Card, CardContent } from "@/components/ui/card";

import { columnsTableCuentas, CuentasColumn } from "../../../features/cuentas/components/columns";
import { DataTable } from "@/components/data-table";
import { useGetCuentas } from "@/features/cuentas/api/use-get-cuentas";

import { useRouter } from 'next/navigation';

import { Heading } from "@/components/heading";

const AccountsPage = () => {

  const { data, isLoading, } = useGetCuentas();
  const router = useRouter();

  const cuentas: CuentasColumn[] = (data ?? []).map((item) => ({
    id: item.id,
    nombre: item.nombre,
    plaidId: item.plaidId ?? '',
    userId: item.userId,
    createdAt: format(new Date(item.createdAt), "M/d/yyyy"),  // Convertir a Date
    updatedAt: format(new Date(item.updatedAt), "M/d/yyyy"),  // Convertir a Date
}));

  return (
    <>
      <Heading
        items={[
          { label: "Cuentas", href: "/cuentas" },
          { label: "Lista", href: "/cuentas" },
        ]}
        title="Cuentas"
        buttonAction={() => router.push("/cuentas/crear")}
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTable filterKey="nombre" columns={columnsTableCuentas} data={cuentas} isLoading={isLoading} />
        </CardContent>
      </Card>
    </>
  );
}

export default AccountsPage;
