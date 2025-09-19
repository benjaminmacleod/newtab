document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('searchInput').value.trim();

  // Regex to detect URLs
  const urlPattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\S*)?$/i;

  if (urlPattern.test(input)) {
    // If it's a URL, ensure it has a protocol
    const url = input.startsWith('http') ? input : 'https://' + input;
    window.location.href = url;
  } else {
    // Otherwise, treat it as a search query
    const formattedQuery = encodeURIComponent(input);
    const searchUrl = `https://www.google.com/search?q=${formattedQuery}&udm=14`;
    window.location.href = searchUrl;
  }
});
