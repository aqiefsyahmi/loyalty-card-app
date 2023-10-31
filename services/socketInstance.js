import { io } from "socket.io-client";
import { getObject } from "../helpers/asyncStorage";

const getToken = async () => {
  const token = await getObject("token");

  return token?.accessToken;
};

export const socket = io("http://localhost:3000", {
  auth: {
    token: await getToken(),
  },
}); // store in env
