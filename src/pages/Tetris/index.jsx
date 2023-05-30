import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag } from "react-use-gesture";
import BarLoader from "react-spinners/BarLoader";
import { useWallet } from "@sei-js/react";

import Stage from "../../components/Tetris/Stage";
import { useInterval } from "../../hooks/useInterval";
import Center from "../../components/Tetris/Center";

import { PrintPlayerInMap } from "../../utils";
import ACTIONS from "../../config/actions";

//TODO: Alterar OnClick (rotatePlayer) para OnFastClick (criar hook)
//TODO: Organização do componente "Game" (Separar codigo em hooks, outros components e funcoes)
//TODO: Dar um tempo quando o bloco estiver no chão, mas o usuário mexendo

const STAGE_HEIGHT = 18;
const STAGE_WIDTH = 10;

const initialMap = [...new Array(STAGE_HEIGHT)].map(() =>
  [...new Array(STAGE_WIDTH)].map(() => ({ fill: 0, color: [] }))
);

const colors = [
  "#e54b4b",
  "#9a031e",
  "#fcdc4d",
  "#005397",
  "#0bbcd6",
  "#20ad65",
  "#f8ebee",
];

const I = {
  bloco: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const O = {
  bloco: [
    [1, 1],
    [1, 1],
  ],
};

const T = {
  bloco: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

const J = {
  bloco: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
};

const L = {
  bloco: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
};

const S = {
  bloco: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
};

const Z = {
  bloco: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

const getRandomBloco = () => {
  const blocos = [I, O, T, J, L, S, Z];
  const bloco = blocos[Math.floor(Math.random() * blocos.length)];
  bloco.color = colors[Math.floor(Math.random() * colors.length)];
  return bloco;
};
const getRandomPlayer = (player) => {
  let bloco, next;
  if (player)
    if (player.next) {
      bloco = JSON.parse(JSON.stringify(player.next));
      next = getRandomBloco();
    }
  if (!bloco) bloco = getRandomBloco();
  if (!next) next = getRandomBloco();
  const pos = [0, Math.floor(STAGE_WIDTH / 2 - 2 / 2)];
  return { pos, bloco, next };
};

const Tetris = () => {
  const navigate = useNavigate();
  const { accounts } = useWallet();
  const [map, setMap] = useState(initialMap);
  const [player, setPlayer] = useState();
  const [down, setDown] = useState(false);
  const [pause, setPause] = useState(false);
  const [tick, setTick] = useState(Date.now());
  const [hintPlayer, setHintPlayer] = useState();
  const [spaceReleased, setSpaceReleased] = useState(true);
  const [lines, setlines] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(120);
  const [clearIn, setClearIn] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("txHash") || !localStorage.getItem("gameLevel")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!clearIn) {
      const clear = setInterval(() => {
        setTime((value) => value - 1);
      }, 1000);
      setClearIn(clear);
    } else if (time == 0) {
      setGameOver(true);
      clearInterval(clearIn);
    }
  }, [time]);

  useEffect(() => {
    const levelBaseScore = 1000;
    const nextLevel = level + 1;
    const nextLevelScore =
      (levelBaseScore * nextLevel * nextLevel * nextLevel) / 5;
    // console.log("Current level: ", level);
    // console.log("Score to next level:", nextLevelScore);
    // console.log("Remaining: ", nextLevelScore - score);
    if (score >= nextLevelScore) setLevel(level + 1);
  }, [level, score]);

  const restartGame = () => {
    // setTime(10);
    setTime(120);
    setMap(initialMap); //TODO: lose game
    setlines(0);
    setScore(0);
    setLevel(1);
    setGameOver(false);
  };

  const loseGame = () => {
    localStorage.removeItem("txHash");
    localStorage.removeItem("betAmount");
    localStorage.removeItem("tetrisId");
    localStorage.removeItem("gameLevel");
    setGameOver(true);
  };

  useEffect(() => {
    if (gameOver) {
      if (window.socket) {
        window.socket.emit(ACTIONS.GET_RESULT_TETRIS, {
          tetrisId: localStorage.getItem("tetrisId"),
          gameScore: score,
        });
      }
    }
  }, [gameOver]);

  const drop = () => {
    if (!player) {
      setPlayer(getRandomPlayer());
      return;
    }
    setPlayer((player) => {
      const newPos = getNewPlayerPos("down");
      if (player.pos === newPos) {
        setMap((map) => {
          const mapWithPlayer = PrintPlayerInMap(player, map);
          const mapCleared = checkMap(mapWithPlayer);
          return mapCleared;
        });
        const newPlayer = getRandomPlayer(player);
        if (!validatePosition(newPlayer.pos, newPlayer.bloco)) loseGame();
        return newPlayer;
      }
      return { ...player, pos: newPos };
    });
  };

  const rotatePlayer = () => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    let mtrx = clonedPlayer.bloco.bloco.map((_, index) =>
      clonedPlayer.bloco.bloco.map((column) => column[index])
    );
    mtrx = mtrx.map((row) => row.reverse());
    if (validatePosition(player.pos, { bloco: mtrx }))
      setPlayer({ ...player, bloco: { ...player.bloco, bloco: mtrx } });
  };

  const keyUp = ({ keyCode }) => {
    if (pause || gameOver) return;
    const THRESHOLD = 80;
    // Activate the interval again when user releases down arrow.
    if (keyCode === 40) {
      setDown(false);
      if (Date.now() - tick <= THRESHOLD) drop();
    }
    if (keyCode === 32) setSpaceReleased(true);
  };

  const forwardDown = () => {
    if (pause || gameOver) return;
    setPlayer((player) => {
      const playerCopy = JSON.parse(JSON.stringify(player));
      playerCopy.pos = [...hintPlayer.pos];
      setMap((map) => {
        const mapWithPlayer = PrintPlayerInMap(playerCopy, map);
        const mapCleared = checkMap(mapWithPlayer);
        return mapCleared;
      });
      const newPlayer = getRandomPlayer(player);
      if (!validatePosition(newPlayer.pos, newPlayer.bloco)) loseGame();
      return newPlayer;
    });
  };

  const keyDown = ({ keyCode }) => {
    if (pause || gameOver) return;
    switch (keyCode) {
      case 37:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("left") }));
        break;
      case 38:
        rotatePlayer();
        break;
      case 39:
        setPlayer((player) => ({ ...player, pos: getNewPlayerPos("right") }));
        break;
      case 40:
        setTick(Date.now());
        setDown(true);
        break;
      case 32:
        if (spaceReleased) {
          setSpaceReleased(false);
          forwardDown();
        }
        break;
      default:
        break;
    }
  };

  const checkMap = React.useCallback(
    (map) => {
      let rowsClear = [];
      map.forEach((row, y) => {
        let clear = true;
        row.forEach((pixel, x) => {
          if (pixel.fill === 0) clear = false;
        });
        if (clear) rowsClear.push(y);
      });
      if (rowsClear.length > 0) {
        let newMap = map.slice();
        rowsClear.forEach((y) => {
          for (let mapY = newMap.length - 1; mapY >= 0; mapY--)
            if (mapY <= y)
              if (mapY > 0) newMap[mapY] = newMap[mapY - 1];
              else
                newMap[mapY] = [...new Array(STAGE_WIDTH)].map(() => ({
                  fill: 0,
                  color: [],
                }));
        });
        setlines((quant) => quant + rowsClear.length);
        const bonusLevel = 100 * (level * level);
        const bonusRows = 40 * (rowsClear.length * rowsClear.length - 1);
        setScore(
          (score) => score + 300 * rowsClear.length + bonusRows + bonusLevel
        );
        return newMap;
      }
      return map;
    },
    [level]
  );

  const validatePosition = React.useCallback(
    (pos, bloco) => {
      for (let y = 0; y < bloco.bloco.length; y++)
        for (let x = 0; x < bloco.bloco[y].length; x++)
          if (bloco.bloco[y][x] === 1) {
            let mapY = pos[0] + y;
            let mapX = pos[1] + x;
            if (
              mapY > STAGE_HEIGHT ||
              mapX < 0 ||
              mapX > STAGE_WIDTH ||
              !map[mapY] ||
              !map[mapY][mapX] ||
              map[mapY][mapX].fill === 1
            )
              return false;
          }
      return true;
    },
    [map]
  );

  const calculateHintPlayer = React.useCallback(
    (player) => {
      const hintBloco = JSON.parse(JSON.stringify(player.bloco));
      let hintPosition = [...player.pos];
      while (
        validatePosition([hintPosition[0] + 1, hintPosition[1]], hintBloco)
      )
        hintPosition = [hintPosition[0] + 1, hintPosition[1]];
      return { pos: hintPosition, bloco: hintBloco };
    },
    [validatePosition]
  );

  const getNewPlayerPos = React.useCallback(
    (movement) => {
      let newPos;
      if (!player) return;
      if (movement === "down") newPos = [player.pos[0] + 1, player.pos[1]];
      if (movement === "left") newPos = [player.pos[0], player.pos[1] - 1];
      if (movement === "right") newPos = [player.pos[0], player.pos[1] + 1];
      if (!validatePosition(newPos, player.bloco)) return player.pos;
      return newPos;
    },
    [player, validatePosition]
  );

  useInterval(
    () => {
      drop();
    },
    pause || gameOver ? null : down ? 50 : 450 - (level - 1) * 20
  );

  useEffect(() => {
    if (!player) return;
    setHintPlayer(calculateHintPlayer(player));
  }, [player, calculateHintPlayer]);

  const bind = useDrag(
    ({ down, movement: [mx, my], velocity }) => {
      const THRESHOLD = 20;
      const FORCE_THRESHOLD = 1;
      if (down) {
        if (Math.abs(mx - dragX) > THRESHOLD) {
          if (mx - dragX > 0)
            setPlayer((player) => ({
              ...player,
              pos: getNewPlayerPos("right"),
            }));
          else
            setPlayer((player) => ({
              ...player,
              pos: getNewPlayerPos("left"),
            }));
          setDragX(mx);
        }
        if (Math.abs(my - dragY) > THRESHOLD) {
          if (velocity > FORCE_THRESHOLD) {
            if (spaceReleased) {
              setSpaceReleased(false);
              forwardDown();
            }
          } else if (my - dragY > 0) drop();
          setDragY(my);
        }
      } else {
        setDragX(0);
        setDragY(0);
        setSpaceReleased(true);
      }
    },
    { filterTaps: true, lockDirection: true }
  );

  if (!player || !map || !hintPlayer)
    return (
      <Center>
        <BarLoader color={"#C41212"} />
      </Center>
    );
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Stage
        time={time}
        lose={gameOver}
        setLose={setGameOver}
        restartClick={() => restartGame()}
        map={map}
        player={player}
        hint={hintPlayer}
        paused={pause}
        status={{ lines, score, level }}
        onBlur={() => setPause(true)}
        onFocus={() => setPause(false)}
        tabIndex="0"
        onKeyUp={keyUp}
        onKeyDown={keyDown}
        onClick={() => rotatePlayer()}
        {...bind()}
      />
    </div>
  );
};

export default Tetris;
