import axios from "axios";

const API_URL = "http://localhost:8090/api/community/";

const create = (communame, commuhost, member) => {
  return axios.post(API_URL + "create", {
    communame,
    commuhost,
    member
  });
};

const getAll = () => {
  return axios
    .get(API_URL + "/");
};

const get = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const CommunityService = {
  create,
  getAll,
  get
}

export default CommunityService;