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

const get = (communityid, date) => {
  return axios.post(API_URL + "date", {
    communityid,
    date
  });
};

const DiaryService = {
  create,
  get
}

export default DiaryService;