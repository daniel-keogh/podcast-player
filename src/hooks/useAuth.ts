import { useState, useContext } from "react";

import AuthContext from "../context/authContext";
import authService from "../services/authService";
import { AxiosError } from "axios";

type Fields = {
  email: string;
  password: string;
  confirmPassword: string;
};

function useAuth() {
  const [error, setError] = useState("");

  const ctx = useContext(AuthContext);

  const resetError = () => setError("");

  const _isValidForm = ({ email, password, confirmPassword }: Partial<Fields>) => {
    if (
      password === "" ||
      (confirmPassword !== undefined && confirmPassword === "") ||
      (email !== undefined && email.trim().length === 0)
    ) {
      setError("All fields are required.");
      return false;
    } else if (confirmPassword !== undefined && password !== confirmPassword) {
      setError("Passwords don't match.");
      return false;
    }
    return true;
  };

  const _authHandler = async (fields: Partial<Fields>, callback: Function) => {
    if (!_isValidForm(fields)) {
      return {
        success: false,
        data: null,
      };
    }

    try {
      return await callback();
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;

      if (err.response) {
        setError(err.response.data.msg + ".");
      } else {
        setError("An error occurred. Try again later.");
      }

      return {
        success: false,
        data: null,
      };
    }
  };

  const login = async ({ email, password }: Pick<Fields, "email" | "password">) => {
    return _authHandler({ email, password }, async () => {
      const data = await authService.login({ email, password });

      ctx.login(data.token);

      return {
        success: ctx.isAuthorized,
        data,
      };
    });
  };

  const register = async ({ email, password, confirmPassword }: Fields) => {
    return _authHandler({ email, password, confirmPassword }, async () => {
      const data = await authService.register({ email, password });

      ctx.login(data.token);

      return {
        success: ctx.isAuthorized,
        data,
      };
    });
  };

  const updateEmail = async ({ email }: { email: Fields["email"] }) => {
    return _authHandler({ email }, async () => {
      const data = await authService.updateEmail({
        email,
        userId: ctx.userId,
      });

      return {
        success: data.status === 200,
        data,
      };
    });
  };

  const updatePassword = async ({
    oldPassword,
    password,
    confirmPassword,
  }: Fields & { oldPassword: string }) => {
    return _authHandler({ password, confirmPassword }, async () => {
      const data = await authService.updatePassword({
        oldPassword,
        password,
      });

      return {
        success: data.status === 200,
        data,
      };
    });
  };

  const deleteAccount = async ({ email, password }: Pick<Fields, "email" | "password">) => {
    return _authHandler({ email, password }, async () => {
      const data = await authService.deleteAccount({
        email,
        password,
        userId: ctx.userId,
      });

      return {
        success: data.status === 204,
        data,
      };
    });
  };

  return {
    error,
    resetError,
    login,
    register,
    updateEmail,
    updatePassword,
    deleteAccount,
  };
}

export default useAuth;
