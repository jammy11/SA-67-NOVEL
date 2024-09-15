import axios from "axios";
import { Novel,NovelBuy } from "../../../interface/interface";

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
      .post(`${apiUrl}/novels`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
 
  async function GetNovels() {
    return await axios
      .get(`${apiUrl}/novels`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }

  async function GetPublicNovels() {
    return await axios
      .get(`${apiUrl}/public-novels`, requestOptions)
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
  


  async function UpdateNovelById(id: string, data: NovelBuy) {
    return await axios
    .put(`${apiUrl}/novels/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
  }
  
  
  async function DeleteNovelById(id: string) {
    return await axios
      .delete(`${apiUrl}/novels/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }

  async function GetNovelById(id: string) {
    return await axios
      .get(`${apiUrl}/novels/${id}`, requestOptions)
      .then((res) => res.data) // Assuming the novel data is in `res.data`
      .catch((e) => e.response);
  }

  // async function GetNovelById(id: string) {
  //   try {
  //     const response = await axios.get(`${apiUrl}/novels/${id}`, requestOptions);
  //     console.log("Fetched novel data:", response.data);
  //     return response.data;
  //   } catch (e) {
  //     console.error("Error fetching novel data:", e.response);
  //     return { error: e.response?.data || "An unknown error occurred" };
  //   }
  // }
  

  // async function IncrementNovelBuyAmount(id: string) {
  //   try {
  //     // ดึงข้อมูลนวนิยาย
  //     const novel = await GetNovelById(id);
  //     const buyAmoun = novel.buy_amount;

  //     console.log(buyAmount); 
  //   }
      // ตรวจสอบการอัพเดตค่า
    //   const buyAmount = novel.buy_amount ?? 0;
    //   const newBuyAmount = buyAmount + 1;
    //   const updatedData = {
    //     ...novel,
    //     buy_amount: newBuyAmount,
    //   };
  
    //   console.log("Updated data:", updatedData);
  
    //   // อัพเดตข้อมูลในฐานข้อมูล
    //   const updateResponse = await UpdateNovelById(id, updatedData);
  
    //   // ตรวจสอบการตอบสนองหลังการอัพเดต
    //   if ('error' in updateResponse) {
    //     throw new Error(updateResponse.error);
    //   }
  
    //   console.log("Update response:", updateResponse);
  
    //   return updateResponse;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error("Error incrementing buy amount:", error.message);
    //     return { error: error.message };
    //   } else {
    //     console.error("Unknown error occurred:", error);
    //     return { error: "An unknown error occurred" };
    //   }
    // }
  // }

  async function IncrementNovelBuyAmount(id: string) {
   
      const response = await GetNovelById(id);
  
      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (!response || !response.novel) {
        throw new Error("Novel data is undefined or incorrect structure");
      }
  
      const novel = response.novel;
      const BuyAmount = novel.buy_amount + 1 ;
      const ID =novel.ID;
      
    
      const updateData: NovelBuy = {
        ...response.novel, 
        buy_amount: BuyAmount, 
      };
      UpdateNovelById( ID, updateData);
  
    
}
  
  export {
    CreateNovel,
    GetNovels,
    GetNovelById,
    GetNovelByUser,
    UpdateNovelById,
    DeleteNovelById,
    GetPublicNovels,
    IncrementNovelBuyAmount
  };