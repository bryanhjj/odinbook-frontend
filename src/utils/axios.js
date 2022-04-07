import axios from "axios";

// Set config defaults when creating the instance, to update accordingly
const instance = axios.create({
  baseURL: "https://odinbook-react.herokuapp.com/api",
});

export default instance;