
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'

import useNotifications from '../hooks/use-sheet-notifications';

import { Separator } from '@/components/ui/separator';

import Notification from '@/components/notification';
import { EstadoRecordatorio } from '@prisma/client';



import { useGetRecordatorios } from '@/features/recordatorios/api/use-get-recordatorios';
import { Recordatorio } from '@/features/recordatorios/types/recordatorio';



export const NotificationsSheet = () => {


    const { isOpen, onClose } = useNotifications();
    const { data } = useGetRecordatorios();

    return (
        <Sheet open={isOpen} onOpenChange={onClose} defaultOpen  >

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Notificaciones</SheetTitle>
                    <SheetDescription>
                        Recibe notificaciones sobre tus recordatorios y presupuestos
                    </SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                <div>

                    {
                        data?.map((item: Recordatorio) => {
                            if (item.estado === EstadoRecordatorio.PROXIMO || item.estado === EstadoRecordatorio.EN_PROCESO) {
                                return (
                                    <Notification
                                        key={item.id}
                                        id={item.id}
                                        title={item.titulo}
                                        description={createDescription(item.descripcion, item.presupuesto?.categoria.nombre, item.estado)}
                                        state={item.estado}
                                    />
                                );
                            }

                        })
                    }
                </div>

            </SheetContent>
        </Sheet>
    );
}


function createDescription(descripcion: string | null, categoria: string | null | undefined, estado: EstadoRecordatorio): string {
    if (!descripcion) {
        if (estado === EstadoRecordatorio.PROXIMO) {
            return `Tu gasto en la categoría ${categoria ?? "desconocida"} está cerca de alcanzar el límite del presupuesto establecido.`;
        } else if (estado === EstadoRecordatorio.EN_PROCESO) {
            return `Has superado el presupuesto establecido para la categoría ${categoria ?? "desconocida"}.`;
        }
    }
    return descripcion ?? "";
}








