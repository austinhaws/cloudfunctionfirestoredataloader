import Collections from "../config/Collections";
import crudDao from "../crudDao/crudDao";

/**
 * @param id string
 * @return {Promise<{}|*[]>}
 */
export default async ({id}) => (
  await crudDao.deleteRecords({
    collection: Collections.bracket,
    where: {id},
  })
);
