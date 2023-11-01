import { io } from "socket.io-client";
import { getObject } from "../helpers/asyncStorage";

const getToken = async () => {
  const token = await getObject("token");

  return token?.accessToken;
};

export const socket = io("https://9xqngmhn-3000.asse.devtunnels.ms/", {
  auth: {
    token: await getToken(),
  },
}); // store in env
