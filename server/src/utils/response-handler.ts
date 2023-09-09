import { type Response } from "express";

interface IResponse {
    res: Response;
    msg: string;
    status: number;
    error?: any;
    data?: any;
}

export const responseHandler = (props: IResponse) => {
    if (props.error) {
        console.log(props.error);
    }

    let message;

    if (props.error) {
        message = props.msg ? props.msg : "Something went wrong";
    } else {
        message = props.msg ? props.msg : "success";
    }

    return props.res.status(props.status).json({
        msg: message,
        data: props.data,
    });
};
