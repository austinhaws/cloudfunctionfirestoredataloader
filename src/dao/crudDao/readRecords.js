import db from "../config/db";
import collectionToArray from "../util/collectionToArray";
import documentToObject from "../util/documentToObject";

/**
 * load record(s) based from a collection based on a single field
 *
 * @param collection string
 * @param record object
 * @param idField string
 * @return {Promise<{}>}
 */
export default async ({collection, record, idField}) => {
  let result;

  if (idField === 'id') {
    let appResult = record[idField] ? await db.collection(collection).doc(record[idField]).get() : null;
    if (appResult && appResult.exists) {
      appResult = documentToObject(appResult);

      // expects results as an array, even if just one
      result = [appResult];
    }
  } else {
    let results = await db.collection(collection).where(idField, '==', record[idField]).get();
    result = collectionToArray(results);
  }

  return result || [];
}
