const speechDao = require("../../dao/speechDao/speechDao");
const blackSpeechData = require('./data/blackSpeechData');
const elfSpeechData = require("./data/elfSpeechData");
const goblinSpeechData = require("./data/goblinSpeechData");
const undeadSpeechData = require("./data/undeadSpeechData");

module.exports = {
    loadSpeeches: () => {
        const speeches = [
            blackSpeechData,
            elfSpeechData,
            goblinSpeechData,
            undeadSpeechData,
        ];

        speeches.forEach(speechDao.saveSpeechData);
        return speeches.map(speech => speech.name);
    },
};
