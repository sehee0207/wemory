import axios from "axios";

const API_URL = "http://localhost:8090/api/community/";

const create = (communityname, commuhost, member) => {
  return axios.post(API_URL + "create", {
    communityname,
    commuhost,
    member
  });
};

const getAll = (username) => {
  return axios.post(API_URL, {username});
};

const get = (communityid) => {
  return axios.get(API_URL + `${communityid}`);
};


const CommunityService = {
  create,
  getAll,
  get
}

export default CommunityService;