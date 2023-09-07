class MenuService {
    constructor() {
      this.apiUrl = "https://localhost:7014/api/Booking/GetAll";
    }
  
    async bookTicket(newBook) {
      try {
        const response = await fetch(`${this.apiUrl}/Booking`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });
        if (!response.ok) {
          throw new Error("Failed to book ticket");
        }
        return response.json();
      } catch (error) {
        console.error("Error booking ticket:", error);
        throw error;
      }
    }
  }
  
  export default MenuService;
  