"use client"

import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import useNotifications from "@/features/notificaciones/hooks/use-sheet-notifications";
import { useGetRecordatorios } from "@/features/recordatorios/api/use-get-recordatorios";
import { EstadoRecordatorio } from "@prisma/client";
import { Recordatorio } from "@/features/recordatorios/types/recordatorio";

const NotificationIcon = () => {

  const { onOpen } = useNotifications();

  const { data, isLoading } = useGetRecordatorios();

  const count = data?.filter( (item : Recordatorio ) => item.estado === EstadoRecordatorio.PROXIMO || item.estado === EstadoRecordatorio.EN_PROCESO).length;

  return (

    <Button
      size="icon"
      onClick={onOpen}
      variant="ghost"
      color="primary"
      className="relative rounded-full "
      disabled={isLoading}
    >
      <Bell className="w-5 h-5" />

      {
        !isLoading &&
        <Badge variant="destructive" className="absolute justify-center items-center text-center min-w-4 w-auto h-4 top-[-2px] dark:bg-red-600 left-4 rounded-full  text-[9px] bg-destructive text-white px-1 py-1" >
          {count}
        </Badge>
      }

    </Button>
  );
}

export default NotificationIcon;