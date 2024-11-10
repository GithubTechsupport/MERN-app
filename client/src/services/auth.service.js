import axios from "axios";

const API_URL = `${process.env.REACT_APP_LOCALHOST}/api/auth/`;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refreshToken = () => {
  return axios.post(API_URL + "refreshToken").then((res) => {
    console.log(res.data);
    return;
  }).catch(err => {console.log(err)});
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
}

export default AuthService;
