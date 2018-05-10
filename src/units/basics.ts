import { Chessground } from "chessground";
import { Unit } from "./unit";
import { voiceRecognition } from "../voiceRecognition";

export const defaults: Unit = {
  name: "Default configuration",
  run(el) {
    const cq = Chessground(el);
    voiceRecognition(cq);
    return cq;
  }
};
