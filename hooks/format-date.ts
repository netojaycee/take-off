export function formatDateTime(dateString: string) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return null; // Return null if the date is invalid
      }
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch (error) {
      console.error("Invalid date:", error);
      return "N/A"; // Return null in case of an error
    }
  }
  
  
  