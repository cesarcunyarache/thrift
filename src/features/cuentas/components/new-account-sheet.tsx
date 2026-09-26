/* import { z } from 'zod';
 */

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'

import useNewAccount from '../hooks/use-new-acount';

/* import { useCreateCuenta } from '../api/use-create-cuenta'; */

/* const formSchema = z.object({
    nombre: z.string().min(1, { message: "Este campo es requerido" }),

}) */
/* 
type formValues = z.infer<typeof formSchema> */

export const NewAccountSheet = () => {

   /*  const { mutate } = useCreateCuenta(); */
    const { isOpen, onClose } = useNewAccount();

  /*   const onSubmit = (values: formValues) => {
        mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    } */
    return (
        <Sheet open={isOpen} onOpenChange={onClose} >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Nueva Cuenta</SheetTitle>
                    <SheetDescription>
                        Crea una nueva cuenta para poder hacer transferencias
                    </SheetDescription>
                </SheetHeader>
               {/*  <AccountForm   /> */}
            </SheetContent>
        </Sheet>
    );
}