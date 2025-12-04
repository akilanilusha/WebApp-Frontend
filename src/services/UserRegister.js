export const registerTourist = async (touristData) => {
  console.log("Registering tourist with data:", touristData);
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/tourists/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(touristData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register tourist");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering tourist:", error);
    throw error;
  }
};
