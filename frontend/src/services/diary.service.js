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

const deleteOne = (communityid, date) => {
  return axios.delete(API_URL + `${communityid}/${date}`);
}

const createComment = (communityid, date, username, comment) => {
  return axios.post(API_URL + "comment", {
    communityid,
    date,
    username,
    comment
  });
};

const getComment = (commentid) => {
  return axios.get(API_URL + `comment/${commentid}`)
}

const DiaryService = {
  create,
  get,
  deleteOne,
  createComment,
  getComment
}

export default DiaryService;