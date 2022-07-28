import axios from "axios";

// Set config defaults when creating the instance, to update accordingly
const instance = axios.create({
  //backend server route
  baseURL: "https://odin-book-backend.herokuapp.com/",
  
  // for testing purposes
  // baseURL: "http://localhost:5000"
});

export default instance;