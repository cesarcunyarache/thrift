
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { es } from 'date-fns/locale'
import { zonedTimeToUtc, utcToZonedTime, format as tzFormat } from 'date-fns-tz'
import { TimePicker } from './date-picker/time-picker'

type Props = {
    value?: Date
    onChange: (date: Date | undefined) => void
    disabled?: boolean
}

export const DateTimePicker = ({ value, onChange, disabled }: Props) => {
    const timeZone = 'America/Lima'

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const utcDate = zonedTimeToUtc(selectedDate, timeZone) 
            onChange(utcDate)
        } else {
            onChange(undefined)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn("w-full justify-start text-left text-sm font-normal", !value && "text-muted-foreground")}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value
                        ? tzFormat(utcToZonedTime(value, timeZone), "P HH:mm:ss", { locale: es })
                        : <span>Selecciona una fecha</span>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value ? utcToZonedTime(value, timeZone) : undefined} 
                    onSelect={handleDateChange} 
                    disabled={disabled || ((date) => date <= new Date())}
                    initialFocus={true}
                />
                <div className="p-3 border-t border-border">
                    <TimePicker setDate={handleDateChange} date={value} />
                </div>
            </PopoverContent>
        </Popover>
    )
}