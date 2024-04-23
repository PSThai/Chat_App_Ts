import Cookies from 'js-cookie';

// Set Cookie with expired time
export const setCookie = async (key: string, data: any, expires: string) => {
  // Expires Date
  const expr = new Date(expires);

  // Data to string
  const strData = JSON.stringify(data);

  // Set Token and save to Cookie 
  Cookies.set(key, strData, { expires: expr });
};

export const getCookie = (key: string): any | null => {
  // Get Cookie
  const result: string | undefined = Cookies.get(key);

  // Debug logging
  console.log("Retrieved cookie:", key, result);

  // Check if cookie exists and is not undefined
  if (result !== undefined) {
    // Parse the cookie data
    try {
      const parseResult = JSON.parse(result);
      return parseResult;
    } catch (error) {
      // If parsing fails, return null
      console.error("Error parsing cookie data:", error);
      return null;
    }
  } else {
    // Debug logging
    console.log("Cookie not found or undefined:", key);
    return null; // Return null if cookie doesn't exist or is undefined
  }
};



// delete Cookie Data
export const deleteCookie = (key: string): void => Cookies.remove(key);
