import fs from "fs";
import { type UploadedFile } from "express-fileupload";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { envs } from "../config";

const client = new S3Client({
    region: envs.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: envs.AWS_PUBLIC_KEY,
        secretAccessKey: envs.AWS_SECRET_KEY,
    },
});

export async function uploadFile(file: UploadedFile, fileKey: string) {
    try {
        const stream = fs.createReadStream(file.tempFilePath);

        const command = new PutObjectCommand({
            Bucket: envs.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: stream,
        });

        return await client.send(command);
    } catch (error) {
        console.log(error);
    }
}

export async function uploadThumbnail(
    pathToThumbnail: string,
    thumbnailKey: string
) {
    try {
        const stream = fs.createReadStream(pathToThumbnail);

        const command = new PutObjectCommand({
            Bucket: envs.AWS_BUCKET_NAME,
            Key: thumbnailKey,
            Body: stream,
        });

        return await client.send(command);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(key: string) {
    const command = new DeleteObjectCommand({
        Bucket: envs.AWS_BUCKET_NAME,
        Key: key,
    });

    await client.send(command);

    return "Deleted successfully";
}

export async function getFiles() {
    const command = new ListObjectsV2Command({
        Bucket: envs.AWS_BUCKET_NAME,
    });

    return await client.send(command);
}

export async function getFileURL(filename: string) {
    const command = new GetObjectCommand({
        Bucket: envs.AWS_BUCKET_NAME,
        Key: filename,
    });

    return await getSignedUrl(client, command, {});
}
