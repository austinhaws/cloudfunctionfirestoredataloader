import db from "../config/db";
import jsonParseStringify from "../util/jsonParseStringify";
import crudDao from "./crudDao";

/**
 * Saves a firestore record. assumes that the record's id is set if it
 * already exists and will add the record as a new one if it isn't set.
 * This function does not check if the record can be found by another
 * field. The caller should load the record's id using readRecordsWhere()
 * or another method as needed before calling this function.
 *
 * Returns the saved record, with id added if record inserted.
 *
 * @param collection string
 * @param record object
 * @param merge bool if true then fields are merged together in document
 * @return {Promise<{}>}
 */
export default async ({collection, record, merge}) => {
  let naturalInput = jsonParseStringify(record);

  if (record.id) {
    await db.collection(collection).doc(record.id).set(naturalInput, {merge: !!merge});

    // because of merge, the naturalInput may not have all the input
    naturalInput = (await crudDao.readRecordsWhere({collection, where: {id: record.id}})).pop();
  } else {
    const docRef = await db.collection(collection).add(naturalInput);
    naturalInput.id = docRef.id;
  }

  return naturalInput;
}
