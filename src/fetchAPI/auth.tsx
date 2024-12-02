import { debugLog } from "../utils/logger";
import { ResponseFormat } from "../utils/ResponseFormat";
import Cookies from "js-cookie";
import {SERVER_ADDR} from "../config/config";

class auth {
  private static HOST: string = SERVER_ADDR;
  static async register(data: { email: string; password: string }) {
    try {
      const response = await fetch(`${this.HOST}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = new ResponseFormat(await response.json());
      if (!result.success) {
        throw new Error(result.data);
      }
      return result;
    } catch (error) {
      alert(error);
    }
  }

  static async login(data: { email: string; password: string }) {
    try {
      const response = await fetch(`${this.HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = new ResponseFormat(await response.json());
      debugLog("Login result: ", result);
      if (!result.success) {
        throw new Error(result.data);
      }
      Cookies.set("authToken", result.data.token, { expires: 7 });
      return result;
    } catch (error) {
      alert(error);
    }
  }

  static async loginGoogle() {
    try {
      const response = await fetch(`${this.HOST}/auth/google`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = new ResponseFormat(await response.json());
      if (!result.success) {
        throw new Error(result.data);
      }
      return result;
    } catch (error) {
      alert(error);
    }
  }
}

export default auth;
