const crudDao = require('../base/crudDao/crudDao');
const Collections = require('../base/config/Collections');

module.exports = {
  readSpeech: async ({name}) => (
    await crudDao.readRecordsWhere({
      collection: Collections.dictionaryPhrases,
      where: { name }
    })
  ),
  saveSpeechData: async speechData => (
    await crudDao.saveRecord({
      collection: Collections.dictionaryPhrases,
      merge: false,
      record: {id: speechData.name, ...speechData},
      where: {name: speechData.name},
    })
  ),
};
