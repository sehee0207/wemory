import axios from "axios";

const API_URL = "http://localhost:8090/api/diary/";

const create = (date, content, photo) => {
  return axios.post(API_URL + "create", {
    date,
    content,
    photo
  });
};

const getAll = () => {
  return axios
    .get(API_URL + "/");
};

const get = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const DiaryService = {
  create,
  getAll,
  get
}

export default DiaryService;