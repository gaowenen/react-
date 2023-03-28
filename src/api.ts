// import { materialList} from './mock/list'
// export function getMaterialList() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(materialList)
//     }, 3000)
//   })
// }
import axios from "axios";
import {User} from './data'
const http = axios.create({
  baseURL: "http://localhost:8888",
});

export const getUserList = () => http.get("/userList");

export const addUser = (data:User) => http.post("/userList", data);

export const delUser = (id:string) => http.delete(`/userList/${id}`);