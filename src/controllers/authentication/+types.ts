import type { User } from "@prisma/client";

export enum SignWithUsernameAndPasswordError {
  CONFLICTING_USERNAME = "CONFLICTING _USERNAME",
  UNKNOWN = "UNKNOWN",
}

export type SignWithUsernameAndPasswordResult = {
  token: string;
  user: User;
};
