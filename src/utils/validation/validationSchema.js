import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email tidak valid")
    .matches(/[a-z0-9._-]+@[a-z0-9]+\.[a-z]/, "Email tidak valid")
    .required("Email harus ada"),
  password: yup.string().trim().required("Password harus ada"),
});

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email tidak valid")
    .matches(/[a-z0-9._-]+@[a-z0-9]+\.[a-z]/, "Email tidak valid")
    .required("Email harus ada"),
  password: yup.string().trim().required("Password harus ada"),
  nama: yup.string().trim().required("Nama lengkap harus ada"),
  noTelp: yup.string().trim().required("No telepon harus ada"),
  noKtp: yup.string().trim().required("No ktp harus ada"),
  alamat: yup.string().trim().required("Alamat harus ada"),
  kecamatan: yup.string().trim().required("Kecamatan harus ada"),
  kabupaten: yup.string().trim().required("Kabupaten/kota harus ada"),
  provinsi: yup.string().trim().required("Provinsi harus ada"),
});
export const updateUserValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email tidak valid")
    .matches(/[a-z0-9._-]+@[a-z0-9]+\.[a-z]/, "Email tidak valid")
    .required("Email harus ada"),
  nama: yup.string().trim().required("Nama lengkap harus ada"),
  noTelp: yup.string().trim().required("No telepon harus ada"),
  noKtp: yup.string().trim().required("No ktp harus ada"),
  alamat: yup.string().trim().required("Alamat harus ada"),
  kecamatan: yup.string().trim().required("Kecamatan harus ada"),
  kabupaten: yup.string().trim().required("Kabupaten/kota harus ada"),
  provinsi: yup.string().trim().required("Provinsi harus ada"),
});

export const tutorialValidationSchema = yup.object().shape({
  title: yup.string().trim().required("Judul harus ada"),
  desc: yup.string().trim().required("Deskripsi harus ada"),
});

export const productValidationSchema = yup.object().shape({
  name: yup.string().trim().required("Nama harus ada"),
  stock: yup.string().trim().required("Stok harus ada"),
  condition: yup.string().trim().required("Kondisi harus ada"),
  price: yup.string().trim().required("Harga harus ada"),
  desc: yup.string().trim().required("Deskripsi harus ada"),
  note: yup.string().trim().required("Catatan harus ada"),
});

export const landValidationSchema = yup.object().shape({
  name: yup.string().trim().required("Nama lahan harus ada"),
  address: yup.string().trim().required("Alamat lahan harus ada"),
  province: yup.string().trim().required("Provinsi lahan harus ada"),
  city: yup.string().trim().required("Kota lahan harus ada"),
  district: yup.string().trim().required("Kecamatan lahan harus ada"),
  location: yup.string().trim().required("Lokasi lahan harus ada"),
  desc: yup.string().trim().required("Deskripsi harus ada"),
  width: yup.string().trim().required("Lebar harus ada"),
  length: yup.string().trim().required("Panjang harus ada"),
  rule: yup.string().trim().required("Aturan harus ada"),
  price: yup.string().trim().required("Harga harus ada"),
});
