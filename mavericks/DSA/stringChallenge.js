class StringChallenge{
    execute(str) {
      // Split the string into start and end time strings
      const [startStr, endStr] = str.split('-');
    
      // Helper function to convert 12-hour time string (e.g., "9:00am" or "12:30pm") into total minutes from midnight
      function convertToMinutes(timeStr) {
        const period = timeStr.slice(-2); // "am" or "pm"
        const [hoursStr, minutesStr] = timeStr.slice(0, -2).split(':');
        
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
    
        // Convert hours based on AM/PM
        if (period === 'pm' && hours !== 12) {
          hours += 12;
        } else if (period === 'am' && hours === 12) {
          hours = 0;
        }
    
        return hours * 60 + minutes;
      }
    
      let startMinutes = convertToMinutes(startStr);
      let endMinutes = convertToMinutes(endStr);
    
      // If the end time is less than or equal to the start time, it means it crosses over to the next day (24 hours later)
      if (endMinutes <= startMinutes) {
        endMinutes += 24 * 60;
      }
    
      return endMinutes - startMinutes;
    }
}

// keep this function call here
console.log(new StringChallenge().execute("12:30pm-12:00am"));
console.log(new StringChallenge().execute("1:23am-1:08am"));