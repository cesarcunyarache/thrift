

import { SelectSingleEventHandler } from 'react-day-picker'

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Calendar  as CalendarIcon} from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { es } from 'date-fns/locale' 


type Props = {
    value?: Date
    onChange?: SelectSingleEventHandler
    disabled?: boolean
}


export const DatePicker = ({ value, onChange, disabled }: Props) => {
    return ( 
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={
                        cn("w-full justify-start text-left text-sm font-normal", !value && "text-muted-foreground")
                    }
                >
                    <CalendarIcon className="size-4 mr-2"/>
                    {value ? format(value, "PPP", {locale: es}) : <span>Selecciona una fecha</span>}

                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus={true}
                />
            </PopoverContent>
        </Popover>
     );
}
 
