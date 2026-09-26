import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Periodo } from "@prisma/client";
import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {  es } from "date-fns/locale";

const TIMEZONE = "America/Lima";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountFromiMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value);
}

export function capitalizeFirstLetter(value: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function calculateInitialAndFinalDates(
  periodo: Periodo
): { fechaInicio: Date; fechaFin: Date } | null {
  const currentDate = utcToZonedTime(new Date(), TIMEZONE);

  switch (periodo) {
    case "DIARIO":
      return { fechaInicio: currentDate, fechaFin: currentDate };

    case "SEMANAL":
      const semanaInicio = startOfWeek(currentDate, { weekStartsOn: 1 });
      const semanaFin = endOfWeek(currentDate, { weekStartsOn: 1 });
      return { fechaInicio: semanaInicio, fechaFin: semanaFin };

    case "MENSUAL":
      const mesInicio = startOfMonth(currentDate);
      const mesFin = endOfMonth(currentDate);
      return { fechaInicio: mesInicio, fechaFin: mesFin };

    case "TRIMESTRAL":
      const trimestreInicio = new Date(
        currentDate.getFullYear(),
        Math.floor(currentDate.getMonth() / 3) * 3,
        1
      );
      const trimestreFin = new Date(
        trimestreInicio.getFullYear(),
        trimestreInicio.getMonth() + 3,
        0
      );
      return { fechaInicio: trimestreInicio, fechaFin: trimestreFin };

    case "ANUAL":
      const anioInicio = new Date(currentDate.getFullYear(), 0, 1);
      const anioFin = new Date(currentDate.getFullYear(), 11, 31);
      return { fechaInicio: anioInicio, fechaFin: anioFin };

    case "PERSONALIZADO":
      return null;
    default:
      return null;
  }
}



export function generateNewDateRange(fechaInicio: Date, fechaFin: Date) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  const diasDuracion = differenceInDays(fin, inicio);

  const nuevaFechaInicio = fin; 
  const nuevaFechaFin = addDays(fin, diasDuracion);

  return {
    fechaInicio: nuevaFechaInicio,
    fechaFin: nuevaFechaFin,
  };
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function fillMissingDates(
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDays = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDays;
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLLL dd", { locale: es })} - ${format(
      defaultTo,
      "LLL dd, y",
      { locale: es }
    )}`;
  }

  if (period.to) {
    return `${format(new Date(period.from), "LLLL dd", { locale: es })} - ${format(
      new Date(period.to),
      "LLL dd, y",
      { locale: es }
    )}`;
  }

  return format(new Date(period.from), "LLLL dd", { locale: es });
}


export function formatPercentage(value: number, options: { addPrefix?: boolean } = { addPrefix: false }) {
  const result = Intl.NumberFormat("es-ES", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+ ${result}`;
  }

  return result;
}


export function calculateNextDate(
  fechaInicial: Date,
  periodo: Periodo | null,
): Date {
  const nuevaFecha = new Date(fechaInicial);

  switch (periodo) {
      case Periodo.DIARIO:
          nuevaFecha.setDate(nuevaFecha.getDate() + 1);
          break;
      case Periodo.SEMANAL:
          nuevaFecha.setDate(nuevaFecha.getDate() + 7);
          break;
      case Periodo.MENSUAL:
          nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
          break;
      case Periodo.TRIMESTRAL:
          nuevaFecha.setMonth(nuevaFecha.getMonth() + 3);
          break;
      case Periodo.ANUAL:
          nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
          break;
      default:
          throw new Error("Período no reconocido.");
  }

  return nuevaFecha;
}