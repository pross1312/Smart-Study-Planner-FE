import Cookies from "js-cookie";

class auth {
  private static HOST: string = "http://localhost:3000";
  static async register(data: { email: string; password: string }) {
    try {
      const response = await fetch(`${this.HOST}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
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
      const result = await response.json();
      Cookies.set("authToken", result.data.token, { expires: 7 });
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
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
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  }
}

export default auth;
