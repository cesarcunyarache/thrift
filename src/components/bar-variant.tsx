import { 
    XAxis, 
    ResponsiveContainer, 
    CartesianGrid, 
    BarChart, 
    Bar,
    Tooltip
} from 'recharts';

import { CustomTooltip } from './custom-tooltip';
import { format } from 'date-fns';


type Props = {
    data?: {
        date: string,
        income: number,
        expenses: number,
    }[];
}


export const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350} >
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    type="monotone"
                    dataKey="income"
                    stackId="income"
                    strokeWidth={2}
                    stroke="#3d82f6"
                    fill="#3d82f6"
                    className="drop-shadow-sm"
                />
                <Bar
                    type="monotone"
                    dataKey="expenses"
                    stackId="expenses"
                    strokeWidth={2}
                    stroke="#f43f5e"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}