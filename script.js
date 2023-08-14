$(function () {
  // Wait for the document to be ready

  // Display the current date in the header
  const currentDate = dayjs().format('MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Function to update time-block class based on time
  function updateBlockStatus() {
    const currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const id = $(this).attr('id');
      const hour = parseInt(id.split('-')[1]);

      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Update time-block class initially
  updateBlockStatus();

  // Add a listener for click events on the save buttons
  $('.saveBtn').on('click', function () {
    const timeBlock = $(this).parent();
    const id = timeBlock.attr('id');
    const description = timeBlock.find('.description').val();

    // Save the user input in local storage using the id as the key
    localStorage.setItem(id, description);
  });

  // Retrieve and set user input from local storage
  $('.time-block').each(function () {
    const id = $(this).attr('id');
    const savedDescription = localStorage.getItem(id);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription);
    }
  });

  // Event listener for time-block clicks
  $('.time-block').on('click', function () {
    const descriptionTextarea = $(this).find('.description');
    descriptionTextarea.attr('readonly', false);
    descriptionTextarea.focus();
  });

  // Function to get current hour apart from the time
  function getCurrentHourFromId(id) {
    return parseInt(id.split('-')[1]);
  }

  // Interval to update time-block class every minute
  setInterval(updateBlockStatus, 60000);
});
