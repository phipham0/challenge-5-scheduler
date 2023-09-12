// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $('.time-block').each(function (index, timeBlock) {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const scheduleHour = timeBlock.getAttribute('data-hour');
    const currentHour = dayjs().hour();
    console.log(schedules);

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

        //get parent element
        saveSchedule(event);
      }
    })
  });

  function saveSchedule(event) {
    const hour = event.target.parentElement.getAttribute("data-hour");
    const text = event.target.parentElement.querySelector("textarea").value;
    const newSchedule = {
      hour: hour,
      text: text
    };

    console.log("hour", hour);
    console.log("text", text);
    console.log("schedule", newSchedule);

    if (localStorage.getItem('schedules')){
      // parse will take JSON string --> javascript object/array
      const schedules = JSON.parse(localStorage.getItem('schedules'));
      // Check if schedule has existing hour
      // IF IT DOES
        // - Remove that event
        // - Replace with the new one
      //IF IT DOES NOT 
        // PUSH PER USUAL

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

  $("#currentDay").text(dayjs().format('dddd, MMMM D'));
});
