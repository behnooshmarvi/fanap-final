import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL + "login", {
        userName,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logOut() {
    localStorage.removeItem("user");
  }

  register(name, userName, password) {
    return axios.post(API_URL + "register", {
      name,
      userName,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
