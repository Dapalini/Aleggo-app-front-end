import { getPlaces } from "../services/fakePlaceSampleJSON"
import { DateTime, Interval } from "luxon"

const places = getPlaces();

export const frequencyObj = places[0].workplan[0].assignment[0] 

// Creates job dates for calender and for tracking. args are the
// frequency keys of assignment object from property workplan.
export const createJobDates = (frequencyObj: object) => {
    const {
        frequencyType, 
        frequency, 
        monthWeekNr,
        interval,
        intervalMagnitude,
        yearInterval,
        dayType,
        months,
        weekdays 
    }: any = frequencyObj
   
    const startDate = DateTime.now()

    console.log(weekdays)

    switch(frequencyType){
        case "normal":
          let monthDurations = createTwoYearDurationsFromMonths(months, startDate)
          let validDatesArray: any = []
          switch(frequency.value){
            case("weekly"):
              if(weekdays.length < 1 || !Array.isArray(weekdays)){
                throw new Error("weekDays cannot be empty") 
              }
              for(let i = 0; i < weekdays.length; i++) {
                let currentWeekDay: any = findWeekDay(weekdays[i].value, startDate)
                for(let i = 0; i < monthDurations.length; i++){
                   while(!monthDurations[i].isBefore(currentWeekDay)){
                    if(monthDurations[i].contains(currentWeekDay)) {
                      validDatesArray.push(currentWeekDay)
                    } 
                    currentWeekDay.plus({days: 7})
                    console.log(currentWeekDay.day,monthDurations)
                  }
                  console.log("Valid DAtes Array", validDatesArray)
                }
              }
          }
          return monthDurations
        case "customByWeekOccurence":
            return "customByWeekOccurence"
        case "customByInterval":
            return "customByInterval"
        default:
            return "A mistake has occured."
                }
            }

const createMonthNrArray = (months: any) => {
    let monthNrArr: number[] = [];
    for(let i = 0; i < months.length; i++){
        for(let j = 0; j < months[i].value.length; j++){
            if(!monthNrArr.includes(months[i].value[j])){
                monthNrArr.push(months[i].value[j])
            }
        }
    }
    return monthNrArr                
}

const createTwoYearDurationsFromMonths = (months: any, startDate: any) => {
    let monthNrArr = createMonthNrArray(months)
    let monthDurations = [];
    for(let i = 0; i <= 2; i++){
        for(let j = 0; j < monthNrArr.length; j++){
            let monthStart = DateTime.local(startDate.year + i, monthNrArr[j])
            let monthEnd = DateTime.local(startDate.year + i, monthNrArr[j]).plus({months:1})
            let monthInterval = Interval.fromDateTimes(monthStart, monthEnd)
            monthDurations.push(monthInterval)  
        }
    }
    const twoYearDurations = Interval.merge(monthDurations)
    return twoYearDurations
}

const date = DateTime.local(2021, 1, 8).plus({months:2})

console.log(date.weekday, date.day)


const findWeekDay = (weekdayNrToFind: number, originalDate: any) => {
    if(!(1 <= weekdayNrToFind && weekdayNrToFind <= 7)){
      throw new Error("Weekday not between 1 and 7")
    }
    for(let i = 0; i <= 2; i++){
        if(weekdayNrToFind === originalDate.plus({days:i}).weekday){
            return originalDate.plus({days:i})
        }
    }
    for(let i = -1; i >= -4; i--){
        if(weekdayNrToFind === originalDate.minus({days:-i}).weekday){
            return originalDate.minus({days:-i})
        }
    }
}
const correctDay = findWeekDay(7,date)
//console.log("Original day", date)
console.log("Found day", correctDay.weekday, correctDay.day)
