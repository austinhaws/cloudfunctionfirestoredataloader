// sad that firestore documents don't play well with apollo
const jsonParseStringify = require('./jsonParseStringify');

module.exports = document => {
  const result = jsonParseStringify(document.data());
  result.id = document.id || result.id;
  return result;
};
