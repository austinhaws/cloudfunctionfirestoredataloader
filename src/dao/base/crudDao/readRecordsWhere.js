const db = require('../config/db');
const collectionToArray = require('../util/collectionToArray');
const documentToObject = require('../util/documentToObject');

const readByIds = async ({ collection, ids }) => {
  const records = await db.getAll(...(ids.map(id => db.collection(collection).doc(id))));
  return await collectionToArray({ docs: records });
};

const readByWhere = async ({ collection, where }) => {
console.log('readByWHere', {collection, where});
  const query = Object.keys(where || {})
    .filter(key => where[key])
    .reduce((queryCarry, key) => queryCarry.where(key, '==', where[key]), db.collection(collection));
  const results = await query.get();
  return collectionToArray(results);
};

const readById = async ({ collection, id }) => {
  let appResult = await db.collection(collection).doc(id).get();
  if (appResult && appResult.exists) {
    appResult = documentToObject(appResult);

    // expects results as an array, even if just one
    return [appResult];
  }
};

/**
 * load record(s) based from a collection based on a single field
 * if where has `id` then it searches by a single id
 * if where has `ids` then it searches by a group of ids
 * otherwise it uses key/value exact match pairs for where
 *
 * @param collection string
 * @param where object key value pairs of `key === value` where phrases
 * @return {Promise<{}>}
 */
module.exports = async ({ collection, where }) => {
  let result;
  if (where && where.id) {
    result = await readById({ collection, id: where.id });
  } else if (where && where.ids) {
    result = await readByIds({ collection, ids: where.ids });
  } else {
    result = await readByWhere({ collection, where });
  }
  return result || [];
};
