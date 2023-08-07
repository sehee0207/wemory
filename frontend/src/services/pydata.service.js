import axios from "axios";

const API_URL = "http://localhost:8090/data";

const findAll = () => {
  return axios.get(API_URL);
};

const PydataService = {
  findAll
}

export default PydataService;