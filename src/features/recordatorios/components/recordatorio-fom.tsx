"use client"

import React, {  useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DateTimePicker } from "@/components/date-time-picker";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { EstadoRecordatorio, Periodo } from "@prisma/client";
import { CurrencySimple } from "@/components/currency-simple";
import { capitalizeFirstLetter, convertAmountToMiliunits, formatCurrency } from "@/lib/utils";

import { useCreateRecordatorio } from "../api/use-create-recordatorio";
import { useUpdateRecordatorio } from "../api/use-update-recordatorio";
import { useGetPresupuestos } from "@/features/presupuesto/api/use-get-presupuestos";


type Recordatorio = {
    id: string;
    titulo: string;
    descripcion: string | null;
    estado: EstadoRecordatorio;
    fecha: String;
    activo?: String | null;
    periodo?: Periodo | null;
    presupuestoId?: string | null;
    recurrencia: boolean | null;
    categoriaId?: string;
    umbral?: String | number;
    monto?: number;
} | undefined;

interface RecordatorioFormProps {
    initialData?: Recordatorio | null;
}
export const RecordatorioForm = ({ initialData }: RecordatorioFormProps) => {

    const presupuestoQuery = useGetPresupuestos();
    const createPresupuestoMutation = useCreateRecordatorio();
    const updateRecordatorioMutation = useUpdateRecordatorio(initialData?.id ?? "");

    const router = useRouter();
    const action = initialData ? "Actualizar" : "Crear";

    const [isPresupuestoOpen, setIsPresupuestoOpen] = React.useState(initialData?.presupuestoId ? true : false)
    const [isOpenPeriodo, /* setIsOpenPeriodo */] = React.useState(initialData?.periodo ? true : false)
    const [activeTab, setActiveTab] = React.useState(
        initialData?.umbral !== undefined && Number(initialData.umbral) > 0 ? "umbral" : "monto"
    );

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        if (value === "monto") {
            form.setValue("umbral", "0");
        } else {
            form.setValue("monto", "");
        }
    };

    const formSchema = React.useMemo(() =>
        z.object({
            titulo: z.string().min(1, { message: "El título es requerido" }),
            descripcion: z.string().optional(),
            estado: z.nativeEnum(EstadoRecordatorio, { message: "El estado es requerido" }),
            fecha: z.coerce.date({ message: "La fecha es requerida" }).refine(
                (date) => {
                    // Validar solo si isPresupuestoOpen es falso
                    if (!isPresupuestoOpen) {
                        return date > new Date();
                    }
                    return true; // No se valida si isPresupuestoOpen es true
                },
                {
                    message: "La fecha debe ser mayor a la fecha y hora actuales.",
                }
            ),
            activo: z.coerce.date().optional(),
            periodo: z.nativeEnum(Periodo).optional(),
            recurrencia: z.boolean().optional(),
            categoriaId: z.string().optional(),
            umbral: z.string().optional(),
            monto: z.string().optional(),
            presupuestoId: z.string({ message: "Debe ser un string" }).optional(),
        }).refine(
            (data) => {

                // Solo se requiere presupuestoId cuando isOpenPeriodo es falso
                if (isPresupuestoOpen) {
                    return data.presupuestoId && data.presupuestoId.trim() !== "";
                }
                return true;
            },
            {
                message: "El presupuesto es requerido.",
                path: ["presupuestoId"],
            }
        )
            .refine(
                (data) => {
                    return !data.recurrencia || (data.periodo && data.periodo.trim() !== "");
                },
                {
                    message: "El Periodo es requerido.",
                    path: ["periodo"],
                }
            )
            .refine(
                (data) => {
                    if (!isPresupuestoOpen) return true;
                    const montoValue = parseFloat(data.monto || "0");
                    const umbralValue = parseFloat(data.umbral || "0");
                    return (montoValue > 0 || umbralValue > 0);
                },
                {
                    message: "El Monto es requerido",
                    path: ["monto"],
                }
            ).refine(
                (data) => {
                    if (!isPresupuestoOpen) return true;
                    const montoValue = parseFloat(data.monto || "0");
                    const umbralValue = parseFloat(data.umbral || "0");
                    return (umbralValue > 0 || montoValue > 0);
                },
                {
                    message: "El Umbral es requerido",
                    path: ["umbral"],
                }
            ),
        [isOpenPeriodo, isPresupuestoOpen]);

    type formValues = z.infer<typeof formSchema>;

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                titulo: initialData.titulo,
                descripcion: initialData.descripcion || "",
                estado: initialData.estado,
                fecha: new Date(initialData.fecha.toString()),
                activo: initialData.activo ? new Date(initialData.activo.toString()) : undefined,
                periodo: initialData.periodo ?? undefined,
                recurrencia: initialData.recurrencia ?? false,
                categoriaId: initialData.categoriaId,
                umbral: initialData.umbral ? (Number(initialData.umbral) * 100).toString() : "",
                monto: initialData.monto?.toString() || "",
                presupuestoId: initialData.presupuestoId ?? undefined,
            }
            : {
                titulo: "",
                descripcion: "",
                estado: EstadoRecordatorio.PENDIENTE,
                fecha: new Date(),
                activo: undefined,
                periodo: undefined,
                recurrencia: false,
                umbral: "0",
                monto: '0',
                presupuestoId: undefined,
            },
    });



    const onHandleSubmit = (values: formValues) => {

        if (values.presupuestoId) {
            /*  values.fecha = ; */
        }
        const amount = parseFloat(values.monto ?? "0");
        const amountInMiliunits = convertAmountToMiliunits(amount);

        if (initialData) {
            updateRecordatorioMutation.mutate(
                {
                    ...values,
                    monto: amountInMiliunits,
                    umbral: parseFloat(values.umbral ?? "0") / 100,
                },
                {
                    onSuccess: () => {
                        router.push("/recordatorios");
                    },
                }
            );

        } else {
            createPresupuestoMutation.mutate(
                {
                    ...values,
                    monto: amountInMiliunits,
                    umbral: parseFloat(values.umbral ?? "0") / 100,

                },
                {
                    onSuccess: () => {
                        router.push("/recordatorios");
                    },
                }
            );
        }
    };


    useEffect(() => {
        if (!initialData) {
            if (isPresupuestoOpen) {
                form.setValue("presupuestoId", "");
                form.setValue("monto", "");
                form.setValue("umbral", "0");
            } else {
                form.setValue("presupuestoId", undefined);
            }
        }
  

    }, [isPresupuestoOpen]);


    const isPending = createPresupuestoMutation.isPending || updateRecordatorioMutation.isPending;

    return (
        <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-4 pt-6 max-w-xl">
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-3">
                        <FormField
                            name="titulo"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titulo</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Título del recordatorio"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>

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
                                            placeholder="Descipción del recordatorio (opcional)"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="fecha"
                            control={form.control}

                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Fecha</FormLabel>
                                        <FormControl>
                                            <DateTimePicker

                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isPending || isPresupuestoOpen}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <Collapsible
                            open={isPresupuestoOpen}
                            onOpenChange={setIsPresupuestoOpen}
                            className="w-full space-y-2 rounded-lg border p-4"
                        >
                            <FormItem className="flex flex-row items-center justify-between">
                                <div className="space-y-0.5">
                                    <FormLabel >
                                        Recordatorio para presupuesto
                                    </FormLabel>
                                    <FormDescription>
                                        Se establecerá un recordatorio para el presupuesto seleccionado.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        disabled={isPending || form.watch("recurrencia") || initialData != null}
                                        checked={isPresupuestoOpen}
                                        onCheckedChange={setIsPresupuestoOpen}
                                    />
                                </FormControl>
                            </FormItem>
                            <CollapsibleContent className="space-y-2">
                                <FormField
                                    name="presupuestoId"
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Presupuesto</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete=""

                                                >
                                                    <FormControl>
                                                        <SelectTrigger isLoading={presupuestoQuery.isLoading} disabled={presupuestoQuery.isLoading || isPending} >
                                                            <SelectValue placeholder="Selecciona un presupuesto" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent >
                                                        {presupuestoQuery.data?.length ? (
                                                            presupuestoQuery.data.map((item) => (
                                                                <SelectItem key={item.id} value={item.id} className="p-2">

                                                                    <div className="flex flex-row  items-center justify-between space-x-2">
                                                                        <div>
                                                                            {item.categoria?.nombre}
                                                                        </div>

                                                                        <Badge
                                                                            variant={"default"}
                                                                            className="text-xs font-medium p-1 rounded-md"
                                                                        >
                                                                            {formatCurrency(item.monto)}
                                                                        </Badge>
                                                                        <Badge
                                                                            variant={"secondary"}
                                                                            className="text-xs font-medium p-1 rounded-md"
                                                                        >
                                                                            {capitalizeFirstLetter(item.periodo)}
                                                                        </Badge>
                                                                    </div>
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

                                <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
                                    <TabsList>
                                        <TabsTrigger value="monto">Monto</TabsTrigger>
                                        <TabsTrigger value="umbral">Umbral</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="monto">
                                        <FormField
                                            name="monto"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/*  <FormLabel>Monto</FormLabel> */}
                                                    <FormControl>
                                                        <CurrencySimple
                                                            defaultValue={field.value}
                                                            placeholder="0.00"

                                                            onChange={field.onChange}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>
                                    <TabsContent value="umbral">
                                        <FormField
                                            name="umbral"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="">

                                                    <div className="flex space-x-3 justify-center items-center">
                                                        <Slider
                                                            defaultValue={[50]}
                                                            max={100}
                                                            step={1}
                                                            className="mt-2"
                                                            value={[Number(field.value)]}
                                                            onValueChange={(value) => {
                                                                field.onChange(value[0].toString())
                                                            }}

                                                        />

                                                        <FormControl>
                                                            <Input
                                                                className="w-14 h-10 m-2"

                                                                disabled={isPending}
                                                                placeholder=""
                                                                onChange={(e) => {
                                                                    const newValue = Number(e.target.value);
                                                                    if (newValue >= 0 && newValue <= 100) {
                                                                        field.onChange(newValue);
                                                                    }
                                                                }}
                                                                value={field.value}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >
                                        </FormField>
                                    </TabsContent>
                                </Tabs>

                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible
                            open={form.watch("recurrencia")}
                            onOpenChange={(value) => form.setValue("recurrencia", value)}
                            className="w-full space-y-2 rounded-lg border p-4"
                        >
                            <FormField
                                name="recurrencia"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-row items-center justify-between ">
                                            <div className="space-y-0.5">
                                                <FormLabel>
                                                    Recurrencia
                                                </FormLabel>
                                                <FormDescription>
                                                    Al activarlo, el recordatorio se renovará automáticamente al finalizar cada periodo.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending || isPresupuestoOpen}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }} />
                            <CollapsibleContent className="space-y-2">
                                <FormField
                                    name="periodo"
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Periodo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete="">
                                                    <FormControl>
                                                        <SelectTrigger disabled={isPending}>
                                                            <SelectValue placeholder="Selecciona un periodo" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(Periodo)
                                                            .filter((value) => value !== "PERSONALIZADO")
                                                            .map((value) => (
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

                            </CollapsibleContent>
                        </Collapsible>
                        <Button className="w-36 mt-4" disabled={isPending} type="submit">
                            {(isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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