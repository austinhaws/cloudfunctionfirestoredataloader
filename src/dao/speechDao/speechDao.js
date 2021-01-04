const crudDao = require('../base/crudDao/crudDao');
const Collections = require('../base/config/Collections');

module.exports = {
  readSpeech: async ({name}) => (
    await crudDao.readRecordsWhere({
      collection: Collections.dictionaryPhrases,
      where: { name }
    })
  ),
};
