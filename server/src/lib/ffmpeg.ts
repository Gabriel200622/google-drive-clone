import ffmpeg from "fluent-ffmpeg";

// Generate a thumbnail
export async function generateThumbnail(
    videoUrl: string,
    thumbnailPath: string,
    callback: () => void
) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg()
            .input(videoUrl)
            .screenshot({
                timestamps: ["10%"],
                filename: thumbnailPath,
                size: "1920x1080",
            })
            .on("end", () => {
                resolve();
                callback();
            })
            .on("error", (err: Error) => {
                reject(err);
                console.error("Error:", err);
            });
    });
}
