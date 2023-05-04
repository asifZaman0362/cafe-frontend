import axios from "axios";

export async function get(url) {
  return axios.get(url, {
    headers: {
      Authorization: localStorage.getItem("JWT"),
    },
  });
}

export async function post(url, data) {
  return axios.post(url, data, {
    headers: { Authorization: localStorage.getItem("JWT") },
  });
}

export async function remove(url, item) {
  const fullUrl = `${url}/${item}`;
  return axios.delete(fullUrl, {
    headers: { Authorization: localStorage.getItem("JWT") },
  });
}
