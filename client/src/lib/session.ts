import { cookies } from "next/headers";
import { axiosClient } from "./axios";
import { IDataAxios } from "@/interfaces";

export const getCurrentUser = async () => {
    try {
        const cookieStore = cookies();

        const token = cookieStore.get("token");

        const res: IDataAxios = await axiosClient("/user", {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });

        return { response: res.data };
    } catch (error) {
        return { response: null };
    }
};
