const speechDao = require("../../dao/speechDao/speechDao");
const blackSpeechData = require('./data/blackSpeechData');
const elfSpeechData = require("./data/elfSpeechData");
const goblinSpeechData = require("./data/goblinSpeechData");
const nameData = require("./data/nameData");
const phraseData = require("./data/phraseData");
const undeadSpeechData = require("./data/undeadSpeechData");

module.exports = {
    loadSpeeches: () => {
        const speeches = [
            blackSpeechData,
            elfSpeechData,
            goblinSpeechData,
            // nameData,
            // phraseData,
            undeadSpeechData,
        ];

        speeches.forEach(speechDao.saveSpeechData);
        return speeches.map(speech => speech.name);
    },
};
