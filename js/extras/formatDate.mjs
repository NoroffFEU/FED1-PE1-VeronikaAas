export function formatDate(isoString) {
    const date = new Date(isoString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return formattedDate;
  }