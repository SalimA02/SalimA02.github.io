// New accurate API used: https://www.londonprayertimes.com/api/ , No need to tune!

async function fetchPrayerTimes() {
  try {
      const apiKey = '634b7e6f-ac57-4bc2-a1cb-48f3522e4463'; // Replace with your actual API key
      const format = 'json';
      const url = `https://www.londonprayertimes.com/api/times/?format=${format}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const currentDate = new Date().toISOString().split('T')[0];
      console.log('Current Date:', currentDate);

      if (data.date === currentDate) {
          document.getElementById('Fajr').textContent = data.fajr;
          document.getElementById('Duhr').textContent = data.dhuhr;
          
          document.getElementById('Asr').textContent = PM(data.asr);
          document.getElementById('Maghreb').textContent = PM(data.magrib);
          document.getElementById('Isha').textContent = PM(data.isha);
      } else {
          console.error('Prayer times for today are not available.');
      }

  } catch (error) {
      console.error('Error fetching prayer times:', error.message);
      alert(`Error: ${error.message}`);
  }
}

function PM(time) {
  // console.log('Attempting to add 12 hours to time:', time);
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
    
  hours += 12; // Add 12 hours if less than 12 (e.g., AM times)
  
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes}`;
  // console.log('Converted time with 12 hours added:', formattedTime);
  return formattedTime;
}

window.onload = fetchPrayerTimes;
