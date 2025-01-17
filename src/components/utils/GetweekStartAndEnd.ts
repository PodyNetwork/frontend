// utilities/dateUtils.ts
export const getWeekStartAndEndDates = () => {
    const now = new Date();
  
    const startOfWeek = new Date(now);
    const endOfWeek = new Date(now);
  
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
  
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
  
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); 
  
    return {
      dateFrom: startOfWeek.toISOString().split("T")[0],
      dateTo: endOfWeek.toISOString().split("T")[0],
    };
  };
  