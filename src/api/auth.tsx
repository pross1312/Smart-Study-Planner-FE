import { debugLog } from "../utils/logger";
import { ResponseFormat } from "../utils/ResponseFormat";
import {SERVER_ADDR} from "../config/config";

class auth {
  private static HOST: string = SERVER_ADDR;
  static async register(data: { email: string; password: string }): Promise<ResponseFormat | null> {
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
    return null;
  }

  static async login(data: { email: string; password: string }): Promise<ResponseFormat | null> {
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
      return result;
    } catch (error) {
      alert(error);
    }
    return null;
  }

  static async loginGoogle() {
    try {
      window.open(`${this.HOST}/auth/google`, "_self");
      // const response = await fetch(`${this.HOST}/auth/google`, {
      //   method: "GET"
      // });
      // if (response.redirected) {
      //   // If the backend redirects, navigate the browser to the Google login page
      //   window.location.href = response.url;
      // } else {
      //   const result = new ResponseFormat(await response.json());
      //   debugLog(result);
      //   if (!result.success) {
      //     throw new Error(result.data);
      //   }
      //   return result;
      // }
    } catch (error) {
      alert(error);
    }
  }
}

export default auth;
