// Load the ICS file and parse events
fetch('schedule.ics')
  .then(response => response.text())
  .then(data => {
    const events = parseICS(data);
    const next = getNextEvent(events);
    displayEvent(next);
  })
  .catch(error => {
    document.getElementById('next-event').textContent = 'Failed to load schedule.';
    console.error('ICS Load Error:', error);
  });

// Parse ICS file into individual VEVENTs
function parseICS(data) {
  const events = [];
  const lines = data.split(/\r?\n/);
  let currentEvent = null;

  for (let line of lines) {
    line = line.trim();

    if (line === 'BEGIN:VEVENT') {
      currentEvent = {};
    } else if (line === 'END:VEVENT') {
      if (currentEvent) events.push(currentEvent);
      currentEvent = null;
    } else if (currentEvent) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':');
      currentEvent[key] = value;
    }
  }

  return events;
}

// Get the next event that starts after now
function getNextEvent(events) {
  const now = new Date();

  const upcoming = events
    .map(event => {
      const start = parseICSTime(event['DTSTART']);
      return {
        summary: event['SUMMARY'] || 'No Title',
        location: event['LOCATION'] || '',
        start: start
      };
    })
    .filter(event => event.start > now)
    .sort((a, b) => a.start - b.start);

  return upcoming[0] || null;
}

// Parse ICS date format (basic UTC or floating)
function parseICSTime(icsTime) {
  const match = icsTime.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
  if (!match) return new Date(0);
  const [_, y, m, d, h, min, s] = match;
  return new Date(Date.UTC(y, m - 1, d, h, min, s)); // Always UTC
}

// Format and display the event in HTML
function displayEvent(event) {
  const container = document.getElementById('next-event');

  if (!event) {
    container.innerHTML = "<p>No upcoming events found.</p>";
    return;
  }

  const start = event.start;

  // Format date
  const dateStr = start.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  // Format time (12-hour, no leading zero, with AM/PM)
  let hours = start.getHours();
  const minutes = start.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // convert 0 to 12

  const timeStr = `${hours}:${minutes} ${ampm}`;

  container.innerHTML = `
    <div class="event-box">
      <h2>${event.summary}</h2>
      <p>${dateStr} at ${timeStr}</p>
      ${event.location ? `<p>${event.location}</p>` : ''}
    </div>
  `;
}
