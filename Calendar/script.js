// DARK MODE TOGGLE

document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
}

//  CHECK LEAP YEAR 

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0 
        || (year % 100 === 0 && year % 400 === 0 ))
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calender = document.querySelector('.calender')

const month_names = ['January', 'February', 'March', 'April', 'May',
 'June', 'July', 'August', 'September', 'October', 'November', 'December']


let month_picker = document.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

// GENERATE CALENDER

generateCalender = (month,year) => {
    let calender_days = document.querySelector('.calender-days')
    calender_days.innerHTML = ''
    let calender_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year),31,30,31,30,
        31,31,30,31,30,31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calender_header_year.innerHTML = year

    let first_day = new Date(month, year , 1)

    for (let i = -1; i <= days_of_month[month] + first_day.getDay() -1 ; i++) {
        let day = document.createElement('div')

        if(i >= first_day.getDay()){
            day.classList.add('calender-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += 
            "<span></span> <span></span> <span></span> <span></span>"

            if (i - first_day.getDay() + 1  === currDate.getDate() && year
            === currDate.getFullYear() && month === currDate.getMonth()){
                day.classList.add('curr-date')
            }
        }

        calender_days.appendChild(day)
    }

}

let month_list = calender.querySelector('.month-list')
month_names.forEach((e, index) =>{
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>` 

    month.onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalender(curr_month.value, curr_year.value)
    }

    month_list.appendChild(month)
})


document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalender(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalender(curr_month.value, curr_year.value)
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalender(curr_month.value, curr_year.value)
