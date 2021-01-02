import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

const secretManagerServiceClient = new SecretManagerServiceClient();

export default async secretName => {
  const [accessResponse] = (await secretManagerServiceClient.accessSecretVersion({name: secretName}));
  const responsePayloadJson = accessResponse.payload.data.toString('utf8');

  return JSON.parse(responsePayloadJson);
}
