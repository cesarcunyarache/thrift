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
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateCuenta } from "../api/use-create-cuenta";
import { useUpdateCuenta } from "../api/use-update-cuenta";
import { Cuenta } from "../types/cuenta";

interface AccountFormProps {
    initialData?: Cuenta | null
}

const formSchema = z.object({
    nombre: z.string({ message: "Este campo es requerido" }).min(1, { message: "Este campo es requerido" }),
})

type formValues = z.infer<typeof formSchema>

export const AccountForm = ({ initialData }: AccountFormProps) => {

    const { mutate, isPending } = useCreateCuenta();
    const { mutate: update, isPending: isPendingUpdate } = useUpdateCuenta(initialData?.id ?? "");

    const router = useRouter();

    const action = initialData ? "Actualizar" : "Crear"

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            nombre: '',
        }
    })

    const onHandleSubmit = (values: formValues) => {

        if (initialData) {
            update(values, {
                onSuccess: () => {
                    router.push("/cuentas");
                }
            });
        } else {
            mutate(values, {
                onSuccess: () => {
                    router.push("/cuentas");
                }
            });
        }
    }


    return (
        <Card className=" shadow-none border border-zinc-200 dark:border-zinc-700 mt-4 pt-6 max-w-xl ">
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onHandleSubmit)}
                        className=""
                    >
                        <FormField
                            name="nombre"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Por ejemplo: Efectivo, Banco, Tarjeta de Crédito"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <Button className="w-36 mt-4" disabled={isPending} type="submit">
                            {(isPending || isPendingUpdate) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {action}
                        </Button>

                        <Button className="w-32 mt-4 ml-2" type="button" disabled={isPending} variant={"outline"} onClick={() => {
                            router.push("/cuentas");
                        }}>
                            Cancelar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    );
}

