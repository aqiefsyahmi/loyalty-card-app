import { io } from "socket.io-client";
import { getObject } from "../helpers/asyncStorage";
import { EXPO_PUBLIC_API_URL } from "@env";

const getToken = async () => {
  const token = await getObject("token");

  return token?.accessToken;
};

// export const socket = io("https://9xqngmhn-3000.asse.devtunnels.ms/", {

export const socket = io(EXPO_PUBLIC_API_URL, {
  auth: {
    token: await getToken(),
  },
}); // store in env

socket.on("connect_error", async (err) => {
  if (err.message === "authentication error") {
    socket.auth.token = await getToken();
  }
  socket.connect();
});
