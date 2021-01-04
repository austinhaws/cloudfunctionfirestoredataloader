const speechDao = require("../../dao/speechDao/speechDao");
const blackSpeechData = require('./data/blackSpeechData');
const elfSpeechData = require("./data/elfSpeechData");
const goblinSpeechData = require("./data/goblinSpeechData");

module.exports = {
    loadSpeeches: () => {
        const speeches = [
            blackSpeechData,
            elfSpeechData,
            goblinSpeechData,
        ];

        speeches.forEach(speechDao.saveSpeechData);
        return speeches.map(speech => speech.name);
    },
};
