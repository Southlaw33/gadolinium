import type { User } from "@prisma/client";

export enum SignUpWithUsernameAndPasswordError {
  CONFLICTING_USERNAME = "CONFLICTING _USERNAME",
  UNKNOWN = "UNKNOWN",
}

export type SignUpWithUsernameAndPasswordResult = {
  token: string;
  user: User;
};

export type LogInWithUsernameAndPasswordResult = {
  token: string;
  user: User;
};

export enum LogInWithUsernameAndPasswordError {
  INCORRECT_USERNAME_OR_PASSWORD = "INCORRECT_USERNAME_OR_PASSWORD",
  UNKNOWN = "UNKNOWN",
}
