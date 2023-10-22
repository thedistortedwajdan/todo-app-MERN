import axios from "axios";

export const register = async (user) => {
  try {
    const res = await axios.post("/users/register", user);
    return res;
  } catch (error) {
    return error;
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post("/users/login", user);
    return res;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const res = axios.get("/users/logout");
    return res;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const res = axios.get("/users/me");
    return res;
  } catch (error) {
    return error;
  }
};

export const updateDetails = async (user) => {
  try {
    const res = axios.put("/users/updatedetails", user);
    return res;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (data) => {
  try {
    const res = axios.put("/users/updatepassword", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async () => {
  try {
    const res = axios.delete("/users/delete");
    return res;
  } catch (error) {
    return error;
  }
};
