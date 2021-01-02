import packageJson from '../../../package';

console.log({packageJson});
export default () => console.log('fetching version', {packageeJsonVersision: packageJson.version}) || packageJson.version;
