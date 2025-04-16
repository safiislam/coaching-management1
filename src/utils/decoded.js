import { jwtDecode } from "jwt-decode";

export const jwtDecoded = async (token) => {
  const decodedHeader = await jwtDecode(token);
  return decodedHeader;
};
