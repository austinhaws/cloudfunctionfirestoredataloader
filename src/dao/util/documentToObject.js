// sad that firestore documents don't play well with apollo
import jsonParseStringify from "./jsonParseStringify";

export default document => {
  const result = jsonParseStringify(document.data());
  result.id = document.id || result.id;
  return result;
}
