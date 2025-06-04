import axios from "axios";

export const GetAll = () => {
    return axios.get(`/api/products`);
}

export const DeleteProduct = (id :String) => {
    return axios.delete(`/api/products/${id}?id=${id}`)
}

export const AddProduct = (name: String, description: String, price: Number, image: String) => {
    return axios.post(`/api/products/`, {name, description, price, image});
}

export const UpdateProduct = (id: String, name: String, description: String, price: Number, image: String) => {
    return axios.put(`/api/products/${id}?id=${id}`, {name, description, price, image});
}

export const UploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};