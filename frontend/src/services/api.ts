import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ajustado para a porta que o terminal mostrou
});