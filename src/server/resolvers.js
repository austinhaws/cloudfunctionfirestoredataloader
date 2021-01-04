const speechDao = require('../dao/speechDao/speechDao');

exports.resolvers = {
  Query: {
    speeches: () => speechDao.readSpeech({name: null}),
  },
};
