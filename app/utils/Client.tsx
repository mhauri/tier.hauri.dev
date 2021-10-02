import {ApiClient} from "@mhauri/tier-api-client"

const client = new ApiClient();
//client.basePath = `${process.env.BASE_API_URL}`;
client.basePath = `https://tier.api.hauri.dev`;

export const Client: ApiClient = client;