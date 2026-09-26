"use client"


import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreatePresupuesto } from "../api/use-create-presupuesto";
import { useUpdatePresupuesto } from "../api/use-update-presupuesto";

import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Periodo } from "@prisma/client";
import { CurrencySimple } from "@/components/currency-simple";


import React from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { DatePickerRange } from "@/components/date-picker-range";
import { calculateInitialAndFinalDates, capitalizeFirstLetter, convertAmountToMiliunits } from "@/lib/utils";

import { Categoria } from "@/features/categorias/types/categoria";

const formSchema = z.object({
    descripcion: z.string().optional(),
    periodo: z.nativeEnum(Periodo, { message: "El campo periodo es requerido" }),
    monto: z.string({ message: "El monto es requerido" }).min(1, { message: "Debe ser un valor positivo" }),
    categoriaId: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }),
    recurrencia: z.boolean().optional(),
    fecha: z
        .object({
            from: z.coerce.date({ message: "La fecha de inicio es requerida" }),
            to: z.coerce.date({ message: "La fecha de fin es requerida" }).optional(),
        }, { message: "La fecha de inicio es requerida" }).optional()
})

    .refine((data) => {
        if (data.periodo === 'PERSONALIZADO') {
            if (data?.fecha?.from === undefined || data?.fecha?.to === undefined) {
                return false;
            }
        }
        return true;
    }, {
        message: "Las fechas son requeridas cuando el periodo es personalizado",
        path: ["fecha"],
    });

type formValues = z.infer<typeof formSchema>

type Presupuesto = {
    monto: number;
    categoria: Categoria
    descripcion: string | null;
    periodo: Periodo;
    fechaInicio: string;
    fechaFin: string;
    recurrencia: boolean | null;
    id: string;
    createdAt: string;
    updatedAt: string;
} | undefined


interface PresupuestoFormProps {
    initialData?: Presupuesto | null
}

export const PresupuestoForm = ({ initialData }: PresupuestoFormProps) => {

    const categoriasQuery = useGetCategorias();
    const { mutate, isPending } = useCreatePresupuesto();

    const { mutate: update, /* isPending: isPendingUpdate */ } = useUpdatePresupuesto(initialData?.id ?? "");

    const router = useRouter();


    const action = initialData ? "Actualizar" : "Crear";

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            categoriaId: initialData.categoria.id,
            descripcion: initialData.descripcion || "",
            monto: initialData.monto.toString() || " ",
            periodo: initialData.periodo,
            fecha: {
                from: new Date(initialData.fechaInicio),
                to: new Date(initialData.fechaFin),
            },
            recurrencia: initialData.recurrencia ?? false,
        } : {
            categoriaId: "",
            descripcion: "",
            monto: "",
            fecha: {
                from: new Date(),
                to: undefined,
            },
        }
    });

    const onHandleSubmit = (values: formValues) => {
        const amount = parseFloat(values.monto);
        const amountInMiliunits = convertAmountToMiliunits(amount);

        /* const fechas = calculateInitialAndFinalDates(values.periodo) */


        if (initialData) {
            const fechas = calculateInitialAndFinalDates(values.periodo);

            if (fechas) {
                update(
                    {
                        ...values,
                        monto: amountInMiliunits,
                        fechaFin: fechas.fechaFin,
                        fechaInicio: fechas.fechaInicio,
                    },
                    {
                        onSuccess: () => {
                            router.push("/presupuestos");   
                        },
                    }
                );
            } else {
                if (values.fecha && values.fecha.from && values.fecha.to) {
                    update(
                        {
                            ...values,
                            monto: amountInMiliunits,
                            fechaFin: values.fecha.to,
                            fechaInicio: values.fecha.from,
                        },
                        {
                            onSuccess: () => {
                                router.push("/presupuestos");
                            },
                        }
                    );
                }
            }
        } else {
            const fechas = calculateInitialAndFinalDates(values.periodo);

            if (fechas) {
                mutate(
                    {
                        ...values,
                        monto: amountInMiliunits,
                        fechaFin: fechas.fechaFin,
                        fechaInicio: fechas.fechaInicio,
                    },
                    {
                        onSuccess: () => {
                            router.push("/presupuestos");
                        },
                    }
                );
            } else {
                if (values.fecha && values.fecha.from && values.fecha.to) {
                    mutate(
                        {
                            ...values,
                            monto: amountInMiliunits,
                            fechaFin: values.fecha.to,
                            fechaInicio: values.fecha.from,
                        },
                        {
                            onSuccess: () => {
                                router.push("/presupuestos");
                            },
                        }
                    );
                }
            }
        }

        console.log({ ...values, monto: amountInMiliunits });
    };

    const disabled = isPending /* || isPendingUpdate; */

    return (
        <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-4 pt-6 max-w-xl">
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-3">
                        <FormField
                            name="categoriaId"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
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
                            name="descripcion"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Descipción del presupuesto (opcional)"
                                            value={field.value ?? ""}
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
                                        <CurrencySimple
                                            defaultValue={field.value}
                                            placeholder="0.00"

                                            onChange={field.onChange}
                                            disabled={disabled}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="periodo"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Periodo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete="">
                                            <FormControl>
                                                <SelectTrigger disabled={disabled}>
                                                    <SelectValue placeholder="Selecciona un periodo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(Periodo).map((value) => (
                                                    <SelectItem key={value} value={value}>
                                                        {capitalizeFirstLetter(value)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            name="fecha"
                            control={form.control}
                            render={({ field }) => {

                                return (
                                    <FormItem>
                                        <FormLabel>Fecha</FormLabel>
                                        <FormControl>
                                            <DatePickerRange
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={disabled || form.watch("periodo") !== "PERSONALIZADO"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="recurrencia"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Activar presupuesto recurrente
                                        </FormLabel>
                                        <FormDescription>
                                            Al activarlo, el presupuesto se renovará automáticamente al finalizar cada periodo.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button className="w-36 mt-4" disabled={isPending} type="submit">
                            {(isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {action}
                        </Button>

                        <Button className="w-32 mt-4 ml-2" type="button" disabled={isPending} variant={"outline"} onClick={() => {
                            router.push("/presupuestos");
                        }}>
                            Cancelar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};