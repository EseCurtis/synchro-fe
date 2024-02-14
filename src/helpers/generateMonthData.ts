import moment from "moment";

export function generateMonthData(year: number = new Date().getFullYear()): { month: string, days: number[] }[] {
    const monthData: { month: string, days: number[] }[] = [];
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
        monthData.push({ month: month.toString(), days: daysArray });
    }
    return monthData;
}


export function generateEventsMonthData(events: { start: string }[], year: number = new Date().getFullYear()): { month: string, days: number[] }[] {
    // Get unique months from events
    const monthsWithEvents = Array.from(new Set(events?.map(event => new Date(event.start).getMonth() + 1)));

    // Generate month data only for months with events
    const monthData: { month: string, days: number[] }[] = [];
    monthsWithEvents.forEach(month => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
        monthData.push({ month: month.toString(), days: daysArray });
    });

    return monthData;
}

export function getDayName(dayNumber: number, month: number, year: number): string {
    const dateString = `${year}-${month+1}-${dayNumber}`;
    console.log("ds", dateString);
    return moment(dateString, "YYYY-MM-DD").format("dddd");
}


export function getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
}
