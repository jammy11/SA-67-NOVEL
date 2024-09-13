import axios from "axios";
import { UsersInterface, SignInInterface, InterfaceStatusWriter } from "../../../interface/interface"; 

const apiUrl = "http://localhost:8000";

// Function to construct the request headers
const getRequestOptions = () => {
  const Authorization = localStorage.getItem("token");
  const Bearer = localStorage.getItem("token_type");

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer ? Bearer : 'Bearer'} ${Authorization ? Authorization : ''}`,
    },
  };
};

// User Functions
async function SignIn(data: SignInInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsers() {
  return await axios
    .get(`${apiUrl}/users`, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersById(id: string) {
  return await axios
    .get(`${apiUrl}/user/${id}`, getRequestOptions())
    .then((res) => res.data)  // Return res.data for cleaner API responses
    .catch((e) => e.response);
}

async function UpdateUsersById(id: string, data: UsersInterface) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateStatusWriterById(id: string, data: InterfaceStatusWriter) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteUsersById(id: string) {
  return await axios
    .delete(`${apiUrl}/user/${id}`, getRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  SignIn,
  CreateUser,
  GetUsers,
  GetUsersById,
  UpdateUsersById,
  DeleteUsersById,
  UpdateStatusWriterById,
};
