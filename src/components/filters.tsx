"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { AccountFilter } from "./account-filter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { DateFilter } from "./date-filter";

export const Filters = () => {

    const { isLoading: isLoadingSummary } = useGetSummary();
    const { user } = useUser();

    if (isLoadingSummary) {
        return (
            <Card className="border-none shadow-none drop-shadow-none mb-4 animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between gap-x-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-96 rounded" />
                        <Skeleton className="h-4 w-80 rounded" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-40 rounded" />
                </CardContent>
            </Card>

        );

    }


    return (
        /*  <div className="flex flex-col gap-y-2 items-center lg:flex-row lg:gap-x-4 lg:gap-y-0">
               <AccountFilter />
   
           </div> */

        <Card className="border shadow-none drop-shadow-none mb-4">
            <CardHeader className="flex flex-row items-center justify-between gap-x-4">
                <div className="space-y-2">
                    <CardTitle className="text-2xl line-clamp-1">
                        Bienvenido (a) de nuevo, {user?.firstName} {user?.lastName} 👋🏻
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-1">
                        Este es su Informe Financiero
                    </CardDescription>
                </div>

            </CardHeader>
            <CardContent className="flex lg:flex-row flex-col gap-4">
                <div className="w-72">
                    <DateFilter />
                </div>
                <AccountFilter />
            </CardContent>
        </Card>
    );
}

