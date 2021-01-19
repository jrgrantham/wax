import axios from "axios";

export default function withAuth(token) {
  const selectedClientId = localStorage.getItem("selectedClientId");
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      selectedClientId,
    },
  });
  return instance;
}
