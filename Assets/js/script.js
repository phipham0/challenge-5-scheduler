$(function () {

  $('.time-block').each(function (index, timeBlock) {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const scheduleHour = timeBlock.getAttribute('data-hour');
    const currentHour = dayjs().hour();

    if (scheduleHour > currentHour) {
      timeBlock.classList.add('future');
    }
    else if (scheduleHour < currentHour) {
      timeBlock.classList.add('past');
    }
    else {
      timeBlock.classList.add('present');
    }

    // Update schedules
    schedules.forEach(function (schedule) {
      // check if schedule matches timeblock
      if (timeBlock.getAttribute("data-hour") === schedule.hour) {
        timeBlock.querySelector("textarea").value = schedule.text;
      }      
    }); 

    //Add event listener for button
    timeBlock.addEventListener("click", function (event) {
      event.preventDefault();
      if (event.target.matches('button')) {
        console.log("clicked button");
        console.log(event.target);

        saveSchedule(event);
      }
    })
  });

  // Save schedule into local storage
  function saveSchedule(event) {
    const hour = event.target.parentElement.getAttribute("data-hour");
    const text = event.target.parentElement.querySelector("textarea").value;
    const newSchedule = {
      hour: hour,
      text: text
    };

    if (localStorage.getItem('schedules')){
      // parse JSON into array
      const schedules = JSON.parse(localStorage.getItem('schedules'));

      //check if the hour we are adding is in the schedules array  
      const indexRmv = schedules.findIndex(function(schedule) {
        if (newSchedule.hour === schedule.hour) {
          return true;
        }
      })

      if (indexRmv !== -1) {
        schedules.splice(indexRmv, 1);
      }

      // push new schedule into schedules rray
      schedules.push(newSchedule);
      // Add back into local storage
      localStorage.setItem('schedules', JSON.stringify(schedules));
    }
    else {
      const schedules = [];
      schedules.push(newSchedule);
      localStorage.setItem('schedules', JSON.stringify(schedules));
    }
  }
  // Update page with content from local storage
  function loadSchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules'));
  }

  //displays current date using dayjs
  $("#currentDay").text(dayjs().format('dddd, MMMM D'));
});
