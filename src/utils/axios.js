import axios from "axios";

// Set config defaults when creating the instance, to update accordingly
const instance = axios.create({
  baseURL: "https://odin-book-backend.herokuapp.com/",
});

export default instance;