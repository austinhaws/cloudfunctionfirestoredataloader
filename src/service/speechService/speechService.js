const speechDao = require("../../dao/speechDao/speechDao");
const blackSpeechData = require('./data/blackSpeechData');

module.exports = {
    loadSpeeches: () => {
        const speeches = [
            blackSpeechData
        ];

        speeches.forEach(speechDao.saveSpeechData);
        return speeches.map(speech => speech.name);
    },
};
