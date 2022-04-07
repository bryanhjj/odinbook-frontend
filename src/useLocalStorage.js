import { useState } from "react";
import axios from "./utils/axios";

function useLocalStorage(key, value) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (key === 'user' && item) {
                // set axios auth header
                axios.defaults.headers.common["Authorization"] = JSON.parse(item).token;
            }
            return item ? JSON.parse(item) : value;
        } catch(error) {    
            console.log(error);
            return value;
        }
    });

    // a wrapped version of setStoredValue
    const setValue = (value) => {
        try{
            // enables functions to be stored as value for APIs
            const toStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(toStore);
            window.localStorage.setItem(key, JSON.stringify(toStore));    
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;