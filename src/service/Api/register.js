import axios from "../../utils/axios";

export const getProvince = () => axios.get("province");
export const getCity = (id) =>
  axios.get("city", {
    params: {
      id_province: id,
    },
  });
export const getDistrict = (id) =>
  axios.get("district", {
    params: {
      id_city: id,
    },
  });
