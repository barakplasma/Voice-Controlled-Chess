import { Chess } from "chess.js";
import { Chessground } from "chessground";
import { Unit } from "./unit";
import { toDests, aiPlay, playOtherSide } from "../util";
import { voiceRecognition } from "../voiceRecognition";

export const initial: Unit = {
  name: "Play legal moves from initial position",
  run(el) {
    const chess = new Chess();
    const cg = Chessground(el, {
      movable: {
        color: "white",
        free: false,
        dests: toDests(chess)
      }
    });
    cg.set({
      movable: { events: { after: playOtherSide(cg, chess) } }
    });
    // voiceRecognition(cg);
    return cg;
  }
};

export const vsRandom: Unit = {
  name: "Play vs random AI",
  run(el) {
    const chess = new Chess();
    const cg = Chessground(el, {
      movable: {
        color: "white",
        free: false,
        dests: toDests(chess)
      }
    });
    voiceRecognition(cg).set({
      movable: {
        events: {
          after: aiPlay(cg, chess, 1000, false)
        }
      }
    });
    return cg;
  }
};

export const fullRandom: Unit = {
  name: "Watch 2 random AIs",
  run(el) {
    const chess = new Chess();
    const cg = Chessground(el, {
      animation: {
        duration: 1000
      },
      movable: {
        free: false
      }
    });
    function makeMove() {
      if (!cg.state.dom.elements.board.offsetParent) return;
      const moves = chess.moves({ verbose: true });
      const move = moves[Math.floor(Math.random() * moves.length)];
      chess.move(move.san);
      cg.move(move.from, move.to);
      setTimeout(makeMove, 700);
    }
    setTimeout(makeMove, 700);
    return cg;
  }
};

export const slowAnim: Unit = {
  name: "Play vs random AI; slow animations",
  run(el) {
    const chess = new Chess();
    const cg = Chessground(el, {
      animation: {
        duration: 5000
      },
      movable: {
        color: "white",
        free: false,
        dests: toDests(chess)
      }
    });
    cg.set({
      movable: {
        events: {
          after: aiPlay(cg, chess, 1000, false)
        }
      }
    });
    return cg;
  }
};
