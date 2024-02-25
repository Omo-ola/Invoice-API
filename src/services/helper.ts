import { v4 as uuidv4 } from "uuid";

export function generateId() {
  return uuidv4().substring(0, 7).toUpperCase(); // Substring to get the first 7 characters and convert to uppercase
}
