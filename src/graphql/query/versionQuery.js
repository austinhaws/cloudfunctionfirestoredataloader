import packageJson from '../../../package';

export default () => console.log('got the query!') || packageJson.version;
