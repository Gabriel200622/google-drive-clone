import { AxiosResponse } from "axios";
import { SWRResponse } from "swr";

export interface IDataSWR extends SWRResponse {
    data: IUser;
}

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    userImageId: string;
    userImageUrl: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface IFolder {
    id: string;
    name: string;

    user: IUser;
    folder: IFolder;
    folders: IFolder[];

    createdAt: Date;
    updatedAt: Date;
}

export interface IFile {
    id: string;
    name: string;
    url: string;
    key: string;
    type: string;

    thumbnail: string;
    thumbnailKey: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface IDataAxios extends AxiosResponse {
    data?: {
        msg: string;
        data?: IUser;
    };
}
