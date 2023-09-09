import { axiosClient } from "@/lib/axios";
import { Method } from "axios";
import { cookies } from "next/headers";

interface Props {
    url: string;
    data?: any;
    method?: Method | string;
}

export const fetchServer = async ({ url, data, method = "GET" }: Props) => {
    const cookieStore = cookies();

    const token = cookieStore.get("token");

    const response = await axiosClient({
        method: method,
        url: url,
        data: data,
        headers: {
            Authorization: `Bearer ${token?.value}`,
        },
    });

    return response;
};
