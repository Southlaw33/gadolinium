import type { User } from "@prisma/client";
import { Sign } from "crypto";
import { createHash } from "crypto";
import { prisma } from "../../extras/prisma";
import {
  LogInWithUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
  type LogInWithUsernameAndPasswordResult,
  type SignUpWithUsernameAndPasswordResult,
} from "./+types";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../environment";
import { PrismaClient } from "@prisma/client/extension";

const createPasswordHash = (parameters: { password: string }): string => {
  return createHash("sha256").update(parameters.password).digest("hex");
};

export const signUpWithUsernameAndPassword = async (parameters: {
  username: string;
  password: string;
}): Promise<SignUpWithUsernameAndPasswordResult> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: parameters.username,
      },
    });

    if (existingUser) {
      throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
    }
    const passwordHash = createPasswordHash({
      password: parameters.password,
    });
    const user = await prisma.user.create({
      data: {
        username: parameters.username,
        password: passwordHash,
      },
    });

    const JwtPayload: jwt.JwtPayload = {
      iss: "atchutha57@gmail.com",
      sub: user.id,
      username: user.username,
    };
    const token = jwt.sign(JwtPayload, jwtSecretKey, {
      expiresIn: "30d",
    });
    const result: SignUpWithUsernameAndPasswordResult = {
      token,
      user,
    };
    return result;
  } catch (e) {
    console.log("error", e);
    throw SignUpWithUsernameAndPasswordError.UNKNOWN;
  }
};

export const LogInWithUsernameAndPassword = async (parameters: {
  username: string;
  password: string;
}): Promise<LogInWithUsernameAndPasswordResult> => {
  try {
    //1. create password hash
    const passwordHash = createPasswordHash({
      password: parameters.password,
    });

    //2.find the user with username and password
    const user = PrismaClient.user.findUnique({
      where: {
        username: parameters.username,
        password: passwordHash,
      },
    });

    //3.user does not exist
    if (!user) {
      throw LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD;
    }

    //4.if user is found , create a jwt token and return it
    const JwtPayload: jwt.JwtPayload = {
      iss: "atchutha57@gmail.com",
      sub: user.id,
      username: user.username,
    };
    const token = jwt.sign(JwtPayload, jwtSecretKey, {
      expiresIn: "30d",
    });

    return {
      token,
      user,
    };
  } catch (e) {
    console.log("error", e);
    throw LogInWithUsernameAndPasswordError.UNKNOWN;
  }
};
