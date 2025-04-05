import {User} from "@/data/response/user/User";

export interface UserLoginResponse {
    token: string;
    user: User;
}