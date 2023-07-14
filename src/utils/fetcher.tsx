import axios from "axios";
export const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    const info = await res.json();
    (error as any).status = res.status;

    console.warn(url, "\nAn error occured while fetching:\n", info);

    throw error;
  }

  return res.json();
};

const urlBase = "https://s/killbet-backend.herokuapp.com";
// const urlBase = "http://192.168.127.99:3004";
export const apiCaller = axios.create({
  baseURL: `${urlBase}/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  withCredentials: true,
});

export const getErrorMessage = (err: any) => {
  let message = "";
  try {
    message = err.response.data.message;
  } catch {
    message = "Something went wrong!";
  }
  return message;
};
