import axios from "axios";

const API_URL = "http://localhost:8090/api/bookmark/";

const create = (communityid, diaryid, username) => {
  return axios.post(API_URL + "create", {
    communityid,
    diaryid,
    username
  });
};

const getAll = (communityid, username) => {
  return axios.post(API_URL, {
    communityid,
    username
  });
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