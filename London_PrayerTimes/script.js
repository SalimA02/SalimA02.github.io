const currentDate = new Date();
const day = currentDate.getDate() -1;
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();





// function getLocation(){
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//         console.log("Geolocation is not supported by this browser.");
//     }
// }

// function showPosition(position) {
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;

    
//     getData(latitude, longitude)

//     let place = document.getElementById("place")
//     place.textContent = `(${latitude}, ${longitude})`

// }



async function getData(latitude, longitude){

    

    const apiUrl = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2&tune=0,0,0,5,1,5,-20,0`;
    // API call with tuning to match Islamic Relief prayer times

    const response = await fetch(apiUrl);
    const data = await response.json();

    
    if(data.code === 200){
        console.log(data.data[day])

        const current = data.data[day].timings

///////////////DATES//////////////////////////
        const gregorian = document.getElementById('gregorian');
        let today = formatDate(data.data[day].date.gregorian.date)
        gregorian.textContent = today;


        const hijri = document.getElementById('hijri');
        let todayHijri = formatIslamicDate(data.data[day].date.hijri.date)
        gregorian.textContent = today;
        hijri.textContent = todayHijri;
    

///////////////CURRENT PRAYER//////////////////////////
    
        


///////////////PRAYERS//////////////////////////
        const Fajr = document.getElementById('Fajr');
        Fajr.textContent = current.Fajr.split(' ')[0];

        const Duhr = document.getElementById('Duhr');
        Duhr.textContent = current.Dhuhr.split(' ')[0];

        const Asr = document.getElementById('Asr');
        Asr.textContent = current.Asr.split(' ')[0];

        const Maghreb = document.getElementById('Maghreb');
        Maghreb.textContent = current.Maghrib.split(' ')[0];

        const Isha = document.getElementById('Isha');
        Isha.textContent = current.Isha.split(' ')[0];

    } else {
        console.log('Failed to fetch data:', data.code);
    }

    

}

//////////////////////////FORMAT ISLAMIC MONTH////////////////////////

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // Create a Date object
    const date = new Date(year, month - 1, day);
  
    // Format the date using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  
    // Get the formatted date string
    const formattedDate = formatter.format(date);
  
    // Add suffix to the day
    const daySuffix = getDaySuffix(day);
    
    return formattedDate.replace(/\b\d+\b/, (match) => match + daySuffix);
  }

//////////////////////////FORMAT ISLAMIC MONTH////////////////////////

function formatIslamicDate(inputDate) {
    const islamicMonths = [
      'Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani',
      'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ];
  
    const parts = inputDate.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Adjust month index
    const year = parseInt(parts[2], 10);
  
    // Format the date using the Islamic month name
    const formattedDate = `${islamicMonths[month]} ${day}${getDaySuffix(day)}, ${year}`;
  
    return formattedDate;
  }

//////////////////////////FORMAT DATE SUFFIX////////////////////////

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
}


getData(51.5074, 0.1272) // Coordinates For Central London




