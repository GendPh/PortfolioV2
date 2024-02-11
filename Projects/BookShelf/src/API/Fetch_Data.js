export const FetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {
    return { error: error.message }; // Returning an object with an error message
  }
}
