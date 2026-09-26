import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PieVariant } from "./pie-variant";
import { RadarVariant } from "./radar-variant";
import { RadialVariant } from "./radial-variant";
import { Skeleton } from "./ui/skeleton";


type Props = {
    data?: {
        name: string,
        value: number,
    }[];
};

export const SpendingPie = ({ data }: Props) => {

    const [chartTyoe, setChartType] = useState("pie");

    const handleChartTypeChange = (type: string) => {
        setChartType(type);
    };

    return (
        <Card className="border shadow-none drop-shadow-none">
            <CardHeader className="flex space-y-2 lg:space-y-2 flex-col">
                <CardTitle className="text-xl line-clamp-1">
                    Categorias
                </CardTitle>
                <Select
                    defaultValue={chartTyoe}
                    onValueChange={handleChartTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Selecciona un tipo de gráfico" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center">
                                <PieChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Gráfico circular
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center">
                                <Radar className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Grafico de radar
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radial">
                            <div className="flex items-center">
                                <Target className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Grafico radial
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {
                    data?.length === 0 ? (
                        <div className="flex flex-col gap-y-4 items-center justify-center h-[315px] w-full">
                            <FileSearch className="size-6 text-muted-foreground" />
                            <p className="text-center">No hay transacciones para mostrar en este periodo</p>
                        </div>
                    ) : (
                        <>
                            {chartTyoe === "pie" && <PieVariant data={data} />}
                            {chartTyoe === "radar" && <RadarVariant data={data} />}
                            {chartTyoe === "radial" && <RadialVariant data={data} />}
                        </>

                    )


                }

            </CardContent>
        </Card>
    );
};

export const SpendingPieLoading = () => {
    return (
        <Card className="border-none shadow-none drop-shadow-none">
            <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 lg:items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 lg:w-[120px] w-full" />
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6  text-slate-200 animate-spin" />
                   
                </div>

            </CardContent>
        </Card>
    );
};