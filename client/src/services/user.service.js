import axios from "axios";


const API_URL = `${process.env.REACT_APP_LOCALHOST}/api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const getQuiz = () => {
  return axios.get(API_URL + "getQuiz")
    .then((response) => {
      if (response.data.quizes) {
        var userInfo = JSON.parse(localStorage.getItem("user"));
        userInfo.quizes = response.data.quizes;
        localStorage.setItem("user", JSON.stringify(userInfo));
      }
    })
};

const createQuiz = (title, questions) => {
  return axios.post(API_URL + "createQuiz", { title, questions }).then((response) => {
    getQuiz();
    console.log(response.data.message);
  }).catch((err) => { console.log(err) })
}

const updateQuiz = (quizID, title, questions) => {
  return axios.post(API_URL + "updateQuiz", { quizID, title, questions }).then((response) => {
    getQuiz();
    console.log(response.data.message)
  }).catch((err) => { console.log(err) })
}

const deleteQuiz = (quizID) => {
  return axios.post(API_URL + "deleteQuiz", { quizID }).then((response) => {
    getQuiz();
    console.log(response.data.message);
  }).catch((err) => {console.log(err)})
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
}

export default UserService;
