import axios from "../../utils/axios";

export const getLandGuest = () => axios.get("land");
export const getProductGuest = () => axios.get("list_product");
