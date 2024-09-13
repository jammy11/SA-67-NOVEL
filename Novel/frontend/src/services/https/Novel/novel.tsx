import axios from "axios";
import { Novel } from "../../../interface/interface";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};


// Transaction Functions
async function CreateNovel(data: Novel) {
    return await axios
      .post(`${apiUrl}/novel`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  
  async function GetNovels() {
    return await axios
      .get(`${apiUrl}/novel`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  
  async function GetNovelById(id: string) {
    return await axios
      .get(`${apiUrl}/novel/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  
  async function GetNovelByUser(id: string) {
    return await axios
      .get(`${apiUrl}/novels/writer/${id}`, requestOptions) // ตรวจสอบว่า URL ตรงกับที่ backend กำหนดไว้
      .then((res) => res)
      .catch((e) => {
        console.error("Error response:", e.response);
        return e.response;
      });
  }
  

  async function UpdateNovelById(id: string, data: Novel) {
    return await axios
      .put(`${apiUrl}/novel/${id}`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  
  async function DeleteNovelById(id: string) {
    return await axios
      .delete(`${apiUrl}/novel/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  export {
    CreateNovel,
    GetNovels,
    GetNovelById,
    GetNovelByUser,
    UpdateNovelById,
    DeleteNovelById
  };