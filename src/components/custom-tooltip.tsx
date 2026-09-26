import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";




export const CustomTooltip = ({ active, payload, }: any) => {
    if (!active) return null;

    const date = payload[0].payload.date;
    const income = payload[0].payload.income;
    const expenses = payload[0].payload.expenses;

    return (
        <div className="rounded-lg bg-white dark:bg-black shadow-md border overflow-hidden">
            <div className="text-sm p-2 px-3 text-muted-foreground">
                {format(new Date(date), "dd MMM")}
            </div>
            <Separator />

            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-betwen gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-blue-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">
                            Ingresos </p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {formatCurrency(income)}
                    </p>
                </div>

                <div className="flex items-center justify-betwen gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-red-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">
                            Gastos </p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {formatCurrency(expenses * -1)}
                    </p>
                </div>
            </div>
        </div>

    );
};