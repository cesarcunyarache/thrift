import { Periodo } from "@prisma/client";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const TIMEZONE = 'America/Lima'; 

export const calculateInitialAndFinalDates = (periodo: Periodo): { fechaInicio: Date, fechaFin: Date } => {
  const currentDate = utcToZonedTime(new Date(), TIMEZONE); 

  switch (periodo) {
    case 'DIARIO':
      return { fechaInicio: currentDate, fechaFin: currentDate };

    case 'SEMANAL':
      const semanaInicio = startOfWeek(currentDate, { weekStartsOn: 1 }); 
      const semanaFin = endOfWeek(currentDate, { weekStartsOn: 1 }); 
      return { fechaInicio: semanaInicio, fechaFin: semanaFin };

    case 'MENSUAL':
      const mesInicio = startOfMonth(currentDate);
      const mesFin = endOfMonth(currentDate);
      return { fechaInicio: mesInicio, fechaFin: mesFin };

    case 'TRIMESTRAL':
      const trimestreInicio = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3, 1);
      const trimestreFin = new Date(trimestreInicio.getFullYear(), trimestreInicio.getMonth() + 3, 0);
      return { fechaInicio: trimestreInicio, fechaFin: trimestreFin };

    case 'ANUAL':
      const anioInicio = new Date(currentDate.getFullYear(), 0, 1);
      const anioFin = new Date(currentDate.getFullYear(), 11, 31);
      return { fechaInicio: anioInicio, fechaFin: anioFin };

    case 'PERSONALIZADO':
    default:
      return { fechaInicio: currentDate, fechaFin: currentDate }; 
  }
}