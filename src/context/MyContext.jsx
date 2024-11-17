import { createContext } from "react";

const MyContext = createContext({
  loading: false, // Default value
  setLoading: () => {}, // Default function
});

export default MyContext;
