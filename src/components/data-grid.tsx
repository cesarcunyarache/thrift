"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import DataCard, { DataCardLoading } from "./data-card";

import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const DataGrid = () => {

    const { data, isLoading } = useGetSummary();

    const params = useSearchParams();
    const from = params.get("from") || undefined;
    const to = params.get("to") || undefined;
    /* const accountId = params.get("accountId") || undefined; */

    const dateRangeLabel = formatDateRange({ from, to });

    if (isLoading) {
        return (
            <div className="grid gir-cols-1 gap-4 lg:grid-cols-3 mb-8">
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    }

    return (
        <div className="grid gir-cols-1 gap-4 lg:grid-cols-3 mb-4">
            <DataCard
                title="Saldo"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Ingresos"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Gastos"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
        </div>
    );
}

export default DataGrid;