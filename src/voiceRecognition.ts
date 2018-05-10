import { Key } from "chessground/types";
import { Api } from "chessground/api";

export const voiceRecognition = (chessGroundApi: Api) => {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var letters = "abcdefgh".split("");
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  var grammar = `#JSGF V1.0; grammar commands; <letter> = ${letters.join(
    " | "
  )}; <number> = ${numbers.join(" | ")}; public <move> = [<letter><number>]+`;

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event: {
    results: [[{ transcript: string; confidence: number }]];
  }) {
    console.log(event);
    var sendToBoard = event.results;
    let le = sendToBoard.length;
    const positions = sendToBoard[le - 1][0].transcript
      .trim()
      .toLowerCase()
      .split(" ");
    console.log(positions[0], "➡️", positions[1]);
    if (sendToBoard[le - 1][0].confidence > 0.75) {
      chessGroundApi.move(positions[0] as Key, positions[1] as Key);
    }
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };

  return chessGroundApi;
};

export default voiceRecognition;
