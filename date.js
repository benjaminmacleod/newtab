// Helper to get ordinal suffix for a day number
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // covers 4-20
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Function to format date like "Monday, September 15th, 2025"
function formatDateWithOrdinal(date) {
  const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const ordinal = getOrdinalSuffix(day);
  return `${weekday}, ${month} ${day}${ordinal}, ${year}`;
}

// Display the formatted date inside the element with id "date"
function displayFormattedDate() {
  const date = new Date();  // You can replace with any Date object
  const formattedDate = formatDateWithOrdinal(date);
  const container = document.getElementById('date');
  if (container) {
    container.textContent = formattedDate;
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', displayFormattedDate);
