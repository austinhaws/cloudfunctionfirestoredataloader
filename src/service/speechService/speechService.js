const speechDao = require("../../dao/speechDao/speechDao");
const blackSpeechData = require('./data/blackSpeechData');
const elfSpeechData = require("./data/elfSpeechData");

module.exports = {
    loadSpeeches: () => {
        const speeches = [
            blackSpeechData,
            elfSpeechData
        ];

        speeches.forEach(speechDao.saveSpeechData);
        return speeches.map(speech => speech.name);
    },
};
