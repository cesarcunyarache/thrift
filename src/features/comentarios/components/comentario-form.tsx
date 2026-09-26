import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateComentarios } from "../api/use-create-comentario";
import { Comentario } from "../types/comentario";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";


interface ComentarioProps {
    initialData?: Comentario | null
}

const formSchema = z.object({
    comentario: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }),
    aceptar: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }) })
})

type formValues = z.infer<typeof formSchema>

export const ComentarioForm = ({ initialData }: ComentarioProps) => {

    const { mutate, isPending } = useCreateComentarios();

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            comentario: '',
            aceptar: true

        }
    })

    const onHandleSubmit = (values: formValues) => {

        mutate(values, {
            onSuccess: () => {
                form.reset();
            }
        });

    }

    return (
        <Card className=" shadow-none border border-zinc-200 dark:border-zinc-700 max-w-xl ">
            <CardHeader>
                <CardTitle>¡Tu opinión nos importa!</CardTitle>
                <CardDescription>Comparte tus ideas, sugerencias o comentarios. Queremos mejorar contigo. </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onHandleSubmit)}
                        className=""
                    >
                        <FormField
                            name="comentario"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    {/*  <FormLabel>Comentario</FormLabel> */}
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Comentario, Opinión, Sugerencia, Recomendación, etc"
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>


                        <FormField
                            name="aceptar"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <div className="flex flex-row space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked === true)}
                                        />
                                        <div className=" flex flex-col m-0">
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Acepta los términos y condiciones
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                                Aceptas nuestros{" "}
                                                <a href="/politica-de-privacidad" className="underline">
                                                    Términos de Servicio y Política de Privacidad
                                                </a>.
                                            </p>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-36 mt-4" disabled={isPending} type="submit">
                            {(isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enviar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}