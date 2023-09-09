import fs from "fs";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
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

export async function uploadFile(file: any) {
    const stream = fs.createReadStream(file.tempFilePath);

    const command = new PutObjectCommand({
        Bucket: envs.AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream,
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
