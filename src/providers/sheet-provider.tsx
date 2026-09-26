"use client"

import { NewAccountSheet } from "@/features/cuentas/components/new-account-sheet"
import { NotificationsSheet } from "@/features/notificaciones/components/notifications-sheet";
import { useMountedState } from "react-use";


export const SheetProvider = () => {

    const isMounted = useMountedState();
    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
            <NotificationsSheet />
        </>
    )
}   