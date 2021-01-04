const db = require('../config/db');

const deleteByIds = async ({ collection, ids }) => {
  const records = await db.getAll(...(ids.map(id => db.collection(collection).doc(id))));
  records.docs.forEach(doc => doc.delete());
  return records.docs.map(doc => doc.id);
};

const deleteByWhere = async ({ collection, where }) => {
  const query = Object.keys(where || {})
    .filter(key => where[key])
    .reduce((queryCarry, key) => queryCarry.where(key, '==', where[key]), db.collection(collection));

  const results = await query.get();
  results.docs.forEach(doc => doc.ref.delete());

  return results.docs.map(doc => doc.ref.id);
};

const deleteById = async ({ collection, id }) => {
  await db.collection(collection).doc(id).delete();
  return [id];
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
    result = await deleteById({ collection, id: where.id });
  } else if (where && where.ids) {
    result = await deleteByIds({ collection, ids: where.ids });
  } else {
    result = await deleteByWhere({ collection, where });
  }
  return result || [];
};
