import axios from "@/config/axios";
import type {
  DeleteAccountRequest,
  DeleteAccountResponse,
  LoginRequest,
  LoginResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
} from "@/types/api/auth";
import type { Profile } from "@/types/api/profile";

class AuthService {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`/api/login`, {
      email,
      password,
    });

    return response.data;
  }

  async register({ email, password }: RegisterRequest): Promise<LoginResponse> {
    await axios.post<RegisterResponse>(`/api/register`, {
      email,
      password,
    });

    return this.login({ email, password });
  }

  async updatePassword({ oldPassword, password }: PasswordResetRequest) {
    return axios.put<PasswordResetResponse>(`/api/password_reset`, {
      oldPassword,
      password,
    });
  }

  async updateEmail({ email, userId }: UpdateEmailRequest) {
    return await axios.put<UpdateEmailResponse>(`/api/users/${userId}`, {
      email,
    });
  }

  async deleteAccount({ email, password, userId }: DeleteAccountRequest) {
    await this.login({ email, password });

    return await axios.delete<DeleteAccountResponse>(`/api/users/${userId}`, {
      data: {
        email,
        password,
      },
    });
  }

  async getProfile(userId: string) {
    const response = await axios.get<Profile>(`/api/users/${userId}`);
    return response.data;
  }
}

export default new AuthService();
