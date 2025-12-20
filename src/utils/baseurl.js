export const getBaseUrl = () => {
  // If the app is running on your server, it uses /api
  // If it's on your local laptop, it uses localhost
  if (import.meta.env.MODE === 'production') {
    return ""; // Leaving this empty makes it use the current domain (bdhabibi.com)
  }
  return "http://localhost:5000"; 
};


  