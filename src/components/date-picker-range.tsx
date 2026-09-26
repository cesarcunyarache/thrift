import { DateRange } from 'react-day-picker'

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn, formatDateRange } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import {  format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { es } from 'date-fns/locale'
import React from 'react'


type Props = {
    value?: DateRange | undefined
     onChange: (value: DateRange | undefined) => void
    disabled?: boolean
}


export const DatePickerRange = ({ value, onChange, disabled }: Props) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    disabled={disabled}
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value?.from ? (
                        value.to ? (
                            <>
                                {formatDateRange({ from: value.from, to: value.to })}
                            </>
                        ) : (
                            format(value.from, "PPP", { locale: es })
                        )
                    ) : (
                        <span>Selecciona un rango de fechas</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    disabled={disabled}
                    initialFocus
                    mode="range"
                    selected={value}
                    onSelect={onChange}
                    numberOfMonths={2}
                />
                
            </PopoverContent>
        </Popover>
    );
}

