
export function filterEventsByDate({ day, month, year }: { day: number, month: number, year: number }, events: any[]) {
    return events?.filter(event => {

        
        const startDate = new Date(event.start);

        return startDate.getDate() === day && startDate.getMonth() === month && startDate.getFullYear() === Number(year) 
    });
}