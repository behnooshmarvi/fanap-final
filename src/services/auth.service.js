import axios from "axios";

const API_URL = "http://192.168.1.8:3000/api/auth/";

class AuthService {
  logIn(userName, password) {
    return axios
      .post(API_URL + "login", {
        userName,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
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
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();