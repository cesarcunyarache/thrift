import { AlarmClock, AlertCircle, Calendar, CheckCircle, Clock, Loader2, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { EstadoRecordatorio } from "@prisma/client";
import { useDeleteRecordatorio } from "@/features/recordatorios/api/use-delete-recordatorio";


/* type BadgeVariant = "outline" | "secondary" | "destructive" | "default" | null | undefined; */

const Notification = ({ id, title, description, state }: { id: string, title: string, description: string, state: EstadoRecordatorio }) => {

    const { color, icon } = getBadgeProps(state);


    const { mutate, isPending } = useDeleteRecordatorio(id)
    const handleOnClick = () => {
        mutate()
    }
    return (

        <Alert className="flex flex-row items-center gap-4 my-4">
            <Badge className={`rounded-xl p-1 ${color}/20`} >
                <Badge className={`rounded-full p-2 ${color} `} >
                    {icon}
                </Badge>
            </Badge>


            <div>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </div>
            <Button
                onClick={handleOnClick}
                size="icon"
                variant="ghost"
                color="primary"
                className="relative rounded-full p-1 w-6 h-6"
            >

                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                    <X className="w-4 h-4" />
                }

            </Button>
        </Alert>
    );
}

export default Notification;



const getBadgeProps = (estado: EstadoRecordatorio): { color: string, icon: React.ReactNode } => {
    switch (estado) {
        case EstadoRecordatorio.PENDIENTE:
            return { color: "bg-orange-500", icon: <Clock className="h-4 w-4 text-white" /> };
        case EstadoRecordatorio.PROXIMO:
            return { color: "bg-yellow-500", icon: <Calendar className="h-4 w-4 text-white" /> };
        case EstadoRecordatorio.EN_PROCESO:
            return { color: "bg-red-700", icon: <AlarmClock className="h-4 w-4 text-white" /> };
        case EstadoRecordatorio.REALIZADO:
            return { color: "default", icon: <CheckCircle className="h-6 w-6" /> };
        case EstadoRecordatorio.VENCIDO:
            return { color: "destructive", icon: <AlertCircle className="h-6 w-6" /> };
        case EstadoRecordatorio.CANCELADO:
            return { color: "destructive", icon: <X className="h-6 w-6" /> };
        default:
            return { color: "default", icon: <AlertCircle className="h-6 w-6" /> };
    }
};
