import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),

  GOOGLE_CLIENT_ID: env.get("GOOGLE_CLIENT_ID").required().asString(),
  GOOGLE_CLIENT_SECRET: env.get("GOOGLE_CLIENT_SECRET").required().asString(),

  APP_URL: env.get("APP_URL").required().asString(),
  CLIENT_URL: env.get("CLIENT_URL").required().asString(),

  AWS_BUCKET_NAME: env.get("AWS_BUCKET_NAME").required().asString(),
  AWS_BUCKET_REGION: env.get("AWS_BUCKET_REGION").required().asString(),
  AWS_PUBLIC_KEY: env.get("AWS_PUBLIC_KEY").required().asString(),
  AWS_SECRET_KEY: env.get("AWS_SECRET_KEY").required().asString(),
};
