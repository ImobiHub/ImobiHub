import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Define o prefixo global
  headers: {
    "Content-Type": "application/json"
  }
});