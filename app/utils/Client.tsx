import {ApiClient} from "@mhauri/tier-api-client"

const client = new ApiClient();
//client.basePath = `${process.env.BASE_API_URL}`;
client.basePath = `http://localhost:8000`;

export const Client: ApiClient = client;