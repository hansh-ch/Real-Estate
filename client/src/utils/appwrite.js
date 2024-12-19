import { Client, Account, Storage } from "appwrite";
export const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const storageID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectID);
export const account = new Account(client);
export const storage = new Storage(client);
