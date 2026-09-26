"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading";

import { useGetTransacciones } from "@/features/transacciones/api/use-get-transacciones";
import { columnsTableTransacciones } from "@/features/transacciones/components/columns";
import { useState } from "react";
import { UploadButton } from "@/features/transacciones/components/upload-button";

import { ImportCard } from "@/features/transacciones/components/import-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTableTransacciones } from "@/components/data-table-transacciones";



enum VARIANTS  { 
    LIST = "LIST",
    IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

const TransaccionesPage = () => {

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST); 
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const trasaccionesQuery = useGetTransacciones();
  const transacciones = trasaccionesQuery.data ?? [];
  const router = useRouter();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log(results)
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  }; 

  const categorias = Array.from(
    transacciones?.reduce((map, item) => {
      const categoria = item.categoria;
      if (categoria && !map.has(categoria.id)) {
        map.set(categoria.id, { label: categoria.nombre, value: categoria.id , withCount: true });
      }
      return map;
    }, new Map())
  ).map(([ , categoria]) => categoria);


  if (variant === VARIANTS.IMPORT) {
    return (
      <div>
        <h1>Importar transacciones</h1>
        <UploadButton onUpload={onUpload} />
        <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={() => console.log("submit")} />
      </div>
    );
  }

  return (
    <>
      <Heading
        items={[
          { label: "Transacciones", href: "/transacciones" },
          { label: "Lista", href: "/transacciones" },
        ]}
        title="Transacciones"
        extraContent={
          <Button onClick={() => router.push("/transacciones/crear")} className="ml-2">
            <PlusIcon className="size-4 mr-2" />
            Añadir nuevo
          </Button>
        }
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTableTransacciones 
                filterKey="beneficiario" 
                columns={columnsTableTransacciones} 
                data={transacciones} 
                isLoading={trasaccionesQuery.isLoading} 
                 filterCategories={categorias}
                />
        </CardContent>
      </Card>
    </>
  );
}

export default TransaccionesPage;