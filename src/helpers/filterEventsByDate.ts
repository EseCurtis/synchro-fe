export function filterEventsByDate({ day, month, year }: { day: number, month: number, year: number }, events: any[]) {
    return events?.filter(event => {

        
        const startDate = new Date(event.start);
        // (startDate.getMonth()+1 == month || startDate.getDay() == day) && console.log(event.title)
        // startDate.getMonth()+1 == month && console.log("Matched Month")
        // startDate.getDay() == day && console.log("Matched Day")

        return startDate.getDate() === day && startDate.getMonth() === month 
    });
}