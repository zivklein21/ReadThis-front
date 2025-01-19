import axios from "axios";
import {SERVER_URL} from "./vars";

export const api = axios.create({
  baseURL: SERVER_URL,
});