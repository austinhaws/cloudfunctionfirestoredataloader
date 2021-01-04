const speechDao = require('../dao/speechDao/speechDao');
const speechService = require('../service/speechService/speechService');

exports.resolvers = {
  Query: {
    speeches: () => speechDao.readSpeech({name: null}),
  },
  Mutation: {
    loadSpeeches: speechService.loadSpeeches,
  },
};
