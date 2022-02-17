import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const S3Upload = async (file: File, key: string) => {
  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
    },
  });
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  try {
    const s3list = await client.send(command);
    return s3list;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("予期せぬエラー");
  }
};
