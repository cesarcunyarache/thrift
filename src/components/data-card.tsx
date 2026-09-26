import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

import { IconType } from 'react-icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import { CountUp } from './count-up'
import { Skeleton } from './ui/skeleton'


const boxVariants = cva(
    "shrink-0 rounded-md p-3",
    {
        variants: {
            variant: {
                default: "bg-blue-500/20",
                success: "bg-emerald-500/20",
                danger: "bg-rose-500/20",
                warning: "bg-yellow-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const iconVariant = cva(
    "size-6",
    {
        variants: {
            variant: {
                default: "fill-blue-500",
                success: "fill-emerald-500",
                danger: "fill-rose-500",
                warning: "fill-yellow-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },

    }
)

type BoxVariants = VariantProps<typeof boxVariants>
type IconVariants = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariants, IconVariants {
    icon: IconType
    title: string
    value?: number
    dateRange: string
    percentageChange?: number
}

export default function DataCard({ icon: Icon, title, value, dateRange, percentageChange, variant }: DataCardProps) {

    console.log(dateRange);
    return (
        <Card className="border shadow-none drop-shadow-none">
            <CardHeader className="flex flex-row items-center justify-between gap-x-4">
                <div className="space-y-2">
                    <CardTitle className="text-2xl line-clamp-1">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-1">
                        {dateRange}
                    </CardDescription>
                </div>
                <div className={cn(boxVariants({ variant }))}>
                    {/* {value && <div className="text-xl font-bold">{value}</div>}
                    {percentageChange && <div className="text-xl font-bold">{percentageChange}%</div>} */}
                    <Icon className={cn(iconVariant({ variant }))} />
                </div>
            </CardHeader>
            <CardContent>
                <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                    <CountUp
                        preserveValue
                        start={0}
                        end={value ?? 0}
                        decimals={2}
                        decimalPlaces={2}
                        formattingFn={formatCurrency}
                    />
                </h1>
                <p className={cn(
                    "text-muted-foreground text-sm",
                    (percentageChange ?? 0) > 0 && "text-green-600",
                    (percentageChange ?? 0) < 0 && "text-rose-500",
                )}>

                    {formatPercentage(percentageChange ?? 0, { addPrefix: true })}
                     {" "} del último período
                </p>
            </CardContent>
        </Card>
    )
}


export const DataCardLoading = () => {
    return (
    <Card className="border-none shadow-none drop-shadow-none h-[192px]">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
            <div className="space-y-2">
                <Skeleton   className="h-6 w-24" />
                <Skeleton   className="h-4 w-40" />
            </div>
            <Skeleton className="size-12" />
        </CardHeader>
        <CardContent>
            <Skeleton className="shrink-0 h-10 w-24 mb-2" />
            <Skeleton className="shrink-0 h-4 w-40" />
        </CardContent>

    </Card>
    )
}