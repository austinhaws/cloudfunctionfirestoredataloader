import saveRecord from "./saveRecord";
import readRecords from "./readRecords";
import readRecordsWhere from "./readRecordsWhere";
import deleteRecords from "./deleteRecords";

/**
 * This provides generic CRUD DAO functionality.
 * It is strongly suggested that the service/resolver layer not call this DAO directly
 * but instead DAOs call this DAO.
 * One big reason for DAOs calling this and not Services is that the DAO layer may
 * becomes more complicated as features/fixes are revealed. When a feature requires
 * a DAO change, if it was written using the CrudDao, then it would require new files
 * and bigger changes. Also, someone may be tempted to put the DAO logic in the
 * service/resolver instead of creating a new DAO.
 *
 * !! use this only from another DAO !!
 */
export default {
  deleteRecords,
  readRecords,
  readRecordsWhere,
  saveRecord,
};
