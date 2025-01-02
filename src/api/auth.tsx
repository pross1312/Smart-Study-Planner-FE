import { debugLog } from "../utils/logger";
import { ResponseFormat } from "../utils/ResponseFormat";
import { SERVER_ADDR } from "../config/config";
import { TOKEN } from "../constants/Common";


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
    } catch (error) {
      alert(error);
    }
  }

  static logout() {
    localStorage.removeItem(TOKEN);
  }
}

export default auth;
