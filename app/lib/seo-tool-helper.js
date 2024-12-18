export const getLastDayOfPreviousMonth = () => { 
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Calculate the last day of the previous month
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0);
    const year = lastDayOfPreviousMonth.getFullYear();
    const month = String(lastDayOfPreviousMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
    const day = String(lastDayOfPreviousMonth.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }