import {https} from 'firebase-functions';
import gqlServer from './graphql/server';

const server = gqlServer();
const api = https.onRequest(server);
export {api};
