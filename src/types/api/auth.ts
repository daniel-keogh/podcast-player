import type { Profile } from "./profile";

type AuthRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = AuthRequest;
export type RegisterResponse = Omit<Profile, "subscriptions">;

export type LoginRequest = AuthRequest;

export type LoginResponse = {
  _id: string;
  msg: string;
  token: string;
};

export type PasswordResetRequest = {
  oldPassword: AuthRequest["password"];
  password: AuthRequest["password"];
};

export type PasswordResetResponse = {
  msg: string;
};

export type DeleteAccountRequest = RegisterRequest & {
  userId: string;
};

export type DeleteAccountResponse = void;

export type UpdateEmailRequest = {
  email: AuthRequest["email"];
  userId: string;
};

export type UpdateEmailResponse = Profile;
