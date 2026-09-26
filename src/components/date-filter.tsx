"use client"

import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn, formatDateRange } from '@/lib/utils';
import { Button } from './ui/button';
import { es } from 'date-fns/locale';
import { Calendar } from './ui/calendar';
import { PopoverClose } from '@radix-ui/react-popover';


export const DateFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramsState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    };

    const [date, setDate] = useState<DateRange | undefined>(paramsState);

    const pushToUrl = (dataRange: DateRange | undefined) => {
        const query = {
            from: format(dataRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dataRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId,
        };

        const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true });
        router.push(url);
    };

    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    };


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"

                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {formatDateRange({ from: date.from, to: date.to })}
                            </>
                        ) : (
                            format(date.from, "PPP", { locale: es })
                        )
                    ) : (
                        <span>Selecciona un rango de fechas</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />

                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                        >
                            Resetear
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            onClick={() => pushToUrl(date)}
                        >
                            Aplicar
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>

    );
}
