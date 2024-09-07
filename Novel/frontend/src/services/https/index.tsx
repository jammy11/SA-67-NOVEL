import axios from "axios";
import { UsersInterface, SignInInterface,TransactionCreateInterface, TransactionInterface, OrderInterface, PackageInterface, CoinInterface } from "../../interface/interface"; 

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

// User Functions
async function SignIn(data: SignInInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
  
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsers() {
  return await axios
    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersById(id: string) {
  return await axios
    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateUsersById(id: string, data: UsersInterface) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteUsersById(id: string) {
  return await axios
    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Transaction Functions
async function CreateTransaction(data: TransactionCreateInterface) {
  return await axios
    .post(`${apiUrl}/transaction`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransactions() {
  return await axios
    .get(`${apiUrl}/transactions`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransacUserID(user_id: string) {
  try {
    const response = await axios.get(`${apiUrl}/transactionbyuser/${user_id}`, requestOptions);
    return response.data; // ส่งคืนข้อมูลโดยตรงจาก response.data
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // หรือ return ค่าผิดพลาดที่เหมาะสม
  }
}

async function GetTransactionById(id: string | null) {
  try {
    const response = await axios.get(`${apiUrl}/transaction/${id}`, requestOptions);
    const data = response.data;

    // Extract the desired fields
    const result = {
      trans_type: data.trans_type,
      payment: data.payment,
      pack_amount: data.Package.pack_amount,
      Name: data.Order.Novel.Name,
    };

    return result;
  } catch (error) {
    return error.response;
  }
}


async function UpdateTransactionById(id: string, data: TransactionInterface) {
  return await axios
    .put(`${apiUrl}/transaction/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTransactionById(id: string) {
  return await axios
    .delete(`${apiUrl}/transaction/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Order Functions
async function CreateOrder(data: OrderInterface) {
  return await axios
    .post(`${apiUrl}/order`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrders() {
  return await axios
    .get(`${apiUrl}/orders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrderById(id: string) {
  return await axios
    .get(`${apiUrl}/order/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateOrderById(id: string, data: OrderInterface) {
  return await axios
    .put(`${apiUrl}/order/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteOrderById(id: string) {
  return await axios
    .delete(`${apiUrl}/order/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Package Functions
async function GetPackages() {
  return await axios
    .get(`${apiUrl}/packages`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPackageById(id: string) {
  return await axios
    .get(`${apiUrl}/package/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Coin Functions
async function GetCoins() {
  return await axios
    .get(`${apiUrl}/coins`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetCoinById(id: string | null) {
  return await axios
    .get(`${apiUrl}/coin/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateCoinById(id: string|null, data: CoinInterface) {
  return await axios
    .put(`${apiUrl}/coins/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteCoinById(id: string) {
  return await axios
    .delete(`${apiUrl}/coins/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Genders Function
async function GetGenders() {
  return await axios
    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function updateCoinBalance(x: number, setBalance: React.Dispatch<React.SetStateAction<number>>) {
  try {
    // Step 1: Get the current coin balance
    const userId = localStorage.getItem("id");
    const getResponse = await GetCoinById(userId);

    if (getResponse.status !== 200) {
      throw new Error("Failed to fetch coin data.");
    }

    const currentBalance = getResponse.data.balance;

    // Step 2: Add x to the current balance
    const newBalance = currentBalance + x;

    // Prepare the data for updating the coin balance
    const updateData: CoinInterface = {
      ...getResponse.data, // Spread existing data
      balance: newBalance, // Update the balance with the new value
    };

    // Step 3: Update the coin balance
    const updateResponse = await UpdateCoinById(userId, updateData);

    if (updateResponse.status !== 200) {
      throw new Error("Failed to update coin balance.");
    }

    // Update the state with the new balance to reflect it in the UI
    setBalance(newBalance);

    return updateResponse.data; // Return the updated coin data
  } catch (error) {
    console.error("Error updating coin balance:", error);
    return null;
  }

}


export {
  SignIn,
  CreateUser,
  GetUsers,
  GetUsersById,
  UpdateUsersById,
  DeleteUsersById,
  CreateTransaction,
  GetTransactions,
  GetTransactionById,
  UpdateTransactionById,
  DeleteTransactionById,
  CreateOrder,
  GetOrders,
  GetOrderById,
  UpdateOrderById,
  DeleteOrderById,
  GetPackages,
  GetPackageById,
  GetCoins,
  GetCoinById,
  UpdateCoinById,
  DeleteCoinById,
  GetGenders,
  updateCoinBalance,
  GetTransacUserID,
};
