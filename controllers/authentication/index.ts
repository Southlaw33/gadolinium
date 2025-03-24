import type {User} from "@prisma/client";
import {Sign } from "crypto";
import { createHash } from "crypto";
import { prisma };
import { SignWithUsernameAndPasswordError, type SignWithUsernameAndPasswordResult } from "./+types";
import { sign, type JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";

export const signUpWithUsernameAndPassword = async(
    parameters: {
        username: string;
        password: string;
    }): Promise <SignUpWithUsernameAndPasswordResult> => {
        try{
            const existingUser = await prisma.user.findUnique({
                where:{
                    username: parameters.username
                },
            });

            if(existingUser){
                throw SignWithUsernameAndPasswordError.CONFLICTING_USERNAME;
            }
            const passwordHash = createHash("sha256").update(parameters.password).digest("hex");
            const user = await prisma.user.create({
                data:{
                    username: parameters.username,
                    password: passwordHash
                },
            });

            const JwtPayload : JwtPayload = {
                iss: "atchutha57@gmail.com",
                sub : user.id
            }
            const  token = sign(JwtPayload,jwtSecretKey, {
                expiresIn:"30d",
            });
            const result : SignWithUsernameAndPasswordResult ={
                token,
                user,
            }
            return result;
        }catch(e){
            console.log("error",e);
            throw SignWithUsernameAndPasswordError.UNKNOWN;
        }