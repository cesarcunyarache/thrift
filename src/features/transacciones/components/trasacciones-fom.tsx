"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2} from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateTransaccion } from "../api/use-create-transaccion";
import { useUpdateTransaccion } from "../api/use-update-transaccion";
import { Transaccion } from "../types/transaccion";
import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";
/* import { useCreateCategorias } from "@/features/categorias/api/use-create-categoria"; */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetCuentas } from "@/features/cuentas/api/use-get-cuentas";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";


const formSchema = z.object({
    fecha: z.coerce.date({ message: "La fecha es requerida" }),
    monto: z.string({ message: "El monto es requerido" }).min(1, { message: "Debe ser un valor positivo" }),
    beneficiario: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }),
    notas: z.string().optional(),  // Campo opcional
    cuentaId: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }),
    categoriaId: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }).optional(),
});

type formValues = z.infer<typeof formSchema>;

interface TransaccionFormProps {
    initialData?: Transaccion | null
}

export const TransaccionForm = ({ initialData }: TransaccionFormProps) => {
    const categoriasQuery = useGetCategorias();
    /* const { mutate: createCategoria} = useCreateCategorias(); */
    const cuentasQuery = useGetCuentas();

/*     const onCreateCategoria = async (nombre: string) => {
        createCategoria({ nombre })
    }; */
    const { mutate, isPending } = useCreateTransaccion();
    const { mutate: update, isPending: isPendingUpdate } = useUpdateTransaccion(initialData?.id ?? "");

    const router = useRouter();


    const action = initialData ? "Actualizar" : "Crear";

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            fecha: initialData.fecha ? new Date(initialData.fecha) : undefined,
            categoriaId: initialData.categoria?.id || '',
            cuentaId: initialData.cuenta?.id || '',
            monto: initialData.monto.toString(), // Convierte `monto` a string
            notas: initialData.notas || undefined,
        } : {
            monto: '', // Como string vacío
            beneficiario: '',
            notas: undefined,
            fecha: new Date(),
            cuentaId: '',
            categoriaId: '',
        }
    });

    const onHandleSubmit = (values: formValues) => {
        const amount = parseFloat(values.monto);
        const amountInMiliunits = convertAmountToMiliunits(amount);
        console.log(amountInMiliunits);
        if (initialData) {
            update({ ...values, monto: amountInMiliunits }, {
                onSuccess: () => {
                    router.push("/transacciones");
                }
            });
        } else {
            mutate({ ...values, monto: amountInMiliunits }, {
                onSuccess: () => {
                    router.push("/transacciones");
                }
            });
        }

        console.log({ ...values, monto: amountInMiliunits });
    };

    const disabled = isPending || isPendingUpdate;

    return (
        <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-4 pt-6 max-w-xl">
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-3">

                        <FormField
                            name="fecha"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Fecha</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={disabled}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField

                            name="cuentaId"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Cuenta</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete="" >
                                            <FormControl>
                                                <SelectTrigger isLoading={cuentasQuery.isLoading} disabled={cuentasQuery.isLoading || disabled} >
                                                    <SelectValue placeholder="Selecciona una cuenta" />
                                                </SelectTrigger>


                                            </FormControl>
                                            <SelectContent>
                                                {cuentasQuery.data?.length ? (
                                                    cuentasQuery.data.map((item) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.nombre}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem disabled value="No hay registros">
                                                        No hay registros
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            name="categoriaId"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Cuenta</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete="" >
                                            <FormControl>
                                                <SelectTrigger isLoading={categoriasQuery.isLoading} disabled={categoriasQuery.isLoading || disabled} >
                                                    <SelectValue placeholder="Selecciona una categoria" />
                                                </SelectTrigger>


                                            </FormControl>
                                            <SelectContent>
                                                {categoriasQuery.data?.length ? (
                                                    categoriasQuery.data.map((item) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.nombre}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem disabled value="No hay registros">
                                                        No hay registros
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            name="beneficiario"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Beneficiario</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={disabled}
                                            placeholder="Persona, empresa o entidadad"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="monto"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto</FormLabel>
                                    <FormControl>
                                        <AmountInput
                                            {...field}
                                            disabled={disabled}
                                            placeholder="0.00"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="notas"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notas</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending || isPendingUpdate}
                                            placeholder="Notas adicionales (opcional)"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <Button className="w-36 mt-4" disabled={isPending || isPendingUpdate} type="submit">
                            {(isPending || isPendingUpdate) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {action}
                        </Button>

                        <Button className="w-32 mt-4 ml-2" type="button" disabled={isPending} variant={"outline"} onClick={() => {
                            router.push("/transacciones");
                        }}>
                            Cancelar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};