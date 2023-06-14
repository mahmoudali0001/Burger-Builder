import axois from "axios";

const instance = axois.create({
  baseURL: "https://burger-builder-7f01a-default-rtdb.firebaseio.com/",
});

export default instance;
