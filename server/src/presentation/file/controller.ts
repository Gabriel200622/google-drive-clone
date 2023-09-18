import fs from "fs-extra";
import { type UploadedFile } from "express-fileupload";
import type { Request, Response } from "express";
import { FileRepository } from "../../domain/interfaces";
import { responseHandler } from "../../utils";
import { GetFiles, UploadFile } from "../../domain/use-cases/file";
import { generateThumbnail, uploadFile, uploadThumbnail } from "../../lib";
import { FileDto } from "../../domain";
import { envs } from "../../config";
import { DeleteFile } from "../../domain/use-cases/file/delete-file";
import { v4 as uuidV4 } from "uuid";

export class FileController {
    constructor(private readonly fileRepository: FileRepository) {}

    public uploadFile = async (req: Request, res: Response) => {
        if (!req.files) {
            return responseHandler({
                data: null,
                status: 400,
                msg: "No file detected",
                res: res,
            });
        }

        const file: UploadedFile = req.files.file as UploadedFile;

        try {
            if (!req.user) {
                return responseHandler({
                    data: null,
                    status: 401,
                    msg: "Not logged in",
                    res: res,
                });
            }

            const { folderId } = req.body;

            const fileKey = uuidV4();
            const thumbnailKey = uuidV4();

            const isVideo = file.mimetype.startsWith("video");

            await uploadFile(file, fileKey);

            const fileUrl = `https://${envs.AWS_BUCKET_NAME}.s3.${envs.AWS_BUCKET_REGION}.amazonaws.com/${fileKey}`;

            const thumbnailPath = `./uploads/${thumbnailKey}.png`;

            if (isVideo) {
                await generateThumbnail(fileUrl, thumbnailPath, async () => {
                    await uploadThumbnail(thumbnailPath, thumbnailKey);
                });
            }

            const thumbnailUrl = `https://${envs.AWS_BUCKET_NAME}.s3.${envs.AWS_BUCKET_REGION}.amazonaws.com/${thumbnailKey}`;

            await fs.unlink(file.tempFilePath);

            if (isVideo) {
                await fs.unlink(thumbnailPath);
            }

            if (!fileUrl) {
                return responseHandler({
                    data: null,
                    status: 404,
                    msg: "File not found",
                    res: res,
                });
            }

            const fileDto = new FileDto({
                name: file.name,
                url: fileUrl,
                key: fileKey,
                type: file.mimetype,
                thumbnail: isVideo ? thumbnailUrl : undefined,
                thumbnailKey: isVideo ? thumbnailKey : undefined,
                userId: req.user.id,
                folderId: folderId ? folderId : undefined,
            });

            new UploadFile(this.fileRepository)
                .execute(fileDto)
                .then((file) => {
                    return responseHandler({
                        data: file,
                        status: 200,
                        msg: "success",
                        res: res,
                    });
                })
                .catch((error) =>
                    responseHandler({
                        data: null,
                        status: 401,
                        msg: error.message,
                        error: error,
                        res: res,
                    })
                );
        } catch (error) {
            await fs.unlink(file.tempFilePath);

            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };

    public deleteFile = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return responseHandler({
                    data: null,
                    status: 401,
                    msg: "Not logged in",
                    res: res,
                });
            }

            const { fileId } = req.params;

            new DeleteFile(this.fileRepository)
                .execute(req.user.id, fileId)
                .then((response) => {
                    return responseHandler({
                        res: res,
                        msg: "success",
                        data: response,
                        status: 200,
                    });
                })
                .catch((error) =>
                    responseHandler({
                        data: null,
                        status: 401,
                        msg: error.message,
                        error: error,
                        res: res,
                    })
                );
        } catch (error) {
            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };

    public getFiles = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                const { folderId } = req.query;

                new GetFiles(this.fileRepository)
                    .execute(req.user.id, folderId as string)
                    .then((files) => {
                        return responseHandler({
                            data: files,
                            status: 200,
                            msg: "success",
                            res: res,
                        });
                    });
            }
        } catch (error) {
            return responseHandler({
                data: null,
                status: 500,
                msg: "Something went wrong",
                error: error,
                res: res,
            });
        }
    };
}
