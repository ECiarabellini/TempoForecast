var dateToday = document.getElementById("dateToday");

dateToday.textContent = dayjs().format('MM/DD/YYYY h:mma');