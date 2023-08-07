import axios from "axios";

const API_URL = "http://localhost:8090/api/bookmark/";

const create = (communityid, date, username) => {
  return axios.post(API_URL + "create", {
    communityid,
    date,
    username
  });
};

const getAll = (communityid, username) => {
  return axios.post(API_URL, {
    communityid,
    username
  });
};

const get = (communityid, date) => {
  return axios.get(API_URL + `${communityid}/${date}`);
};

const deleteOne = (communityid, date) => {
  return axios.delete(API_URL + `${communityid}/${date}`);
};

const DiaryService = {
  create,
  getAll,
  get,
  deleteOne
}

export default DiaryService;