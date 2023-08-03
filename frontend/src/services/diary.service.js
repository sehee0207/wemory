import axios from "axios";

const API_URL = "http://localhost:8090/api/diary/";

const create = (communityid, date, title, content, photo) => {
  return axios.post(API_URL + "create", {
    communityid,
    date,
    title,
    content,
    photo
  });
};

const get = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const DiaryService = {
  create,
  get
}

export default DiaryService;