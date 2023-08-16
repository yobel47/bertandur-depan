import axios from "../../utils/axios";

export const getProduct = (payload) => axios.get("list_product", payload);
export const getProductUser = (payload) => axios.get("product_user", payload);
export const getProductAdmin = (payload) => axios.get("list_product_admin", payload);
export const getDetailProduct = (payload) => axios.get("product?id_product=" + payload);
export const getProductCategory = (payload) => axios.get("product_category?category=" + payload);
export const getTransactionProduct = () => axios.get("list_purchase_product");
export const getTransactionProductAdmin = () => axios.get("list_purchase_product_web_admin");
export const getDetailTransactionProduct = (payload) => axios.get("detail_purchase_product?id_purchase=" + payload);
export const getReviewProduct = (payload) => axios.get("review_product?id_product=" + payload);

export const postProduct = (payload) =>
  axios.post("product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (payload) =>
  axios.post("product_update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const purchaseProduct = (payload) =>
  axios.post("purchase_product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const verificationProductTransaction = (payload) =>
  axios.post("verif_purchase_product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const shipCost = (payload) =>
  axios.post("ship_cost", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postReviewProduct = (payload) =>
  axios.post("review_product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
