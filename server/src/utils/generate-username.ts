import { generateId } from "./generate-id";

export const generateUsername = (email: string) => {
    const usernamePrefix = email.split("@")[0];
    const randomSuffix = generateId();

    return usernamePrefix + randomSuffix;
};
