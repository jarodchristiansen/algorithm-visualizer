import React, { useEffect, useState } from "react";

// algorithms
import { bubbleSort } from "./algorithms/bubbleSort";
import { insertionSort } from "./algorithms/insertionSort";
import { selectionSort } from "./algorithms/selectionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import { twistSort } from "./algorithms/twistSort";

// components
import Navbar from "./sorting-navbar";
import Frame from "./frame";

// helpers
import pause from "./helper/pause";
import generator from "./helper/generator";
import {
  ALGORITHM,
  SPEED,
  SIZE,
  SWAP,
  CURRENT,
  NORMAL,
  DONE,
} from "./helper/constants";
import { getKeysCopy } from "./helper/keys";
import SortingNavbar from "./sorting-navbar";

const SortingVisualizer = () => {
  /*  each element in the list contains a <key, classType> where:
        key - integer value of element,
        classType - css class for changing color of element
    */

  const [list, setList] = useState<{ key: number; classType: number }[]>([]);
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [algorithm, setAlgorithm] = useState(1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    generateList();
  }, []);

  // for updating the state on changing navbar options
  // avoid changing algorithm and size when algorithm is running
  const onChange = (value?: number, option?: string) => {
    if (option === ALGORITHM && !running) {
      //   this.setState({ algorithm: Number(value) });
      setAlgorithm(Number(value));
    } else if (option === SPEED) {
      //   this.setState({ speed: Number(value) });
      setSpeed(Number(value));
    } else if (option === SIZE && !running) {
      //   this.setState({ size: Number(value) });
      setSize(Number(value));
      //   this.generateList();
      generateList();
    }
  };

  // generate a random list
  const generateList = (value = 0) => {
    if ((list.length !== size && !running) || Number(value) === 1) {
      let list = generator(size);
      setList(list);
    }
  };

  // select and run the corresponding algorithm
  const start = async () => {
    lock(true);
    let moves = await getMoves(algorithm);
    await visualizeMoves(moves);
    await done();
    lock(false);
  };

  // get moves for corresponding algorithms
  const getMoves = async (Name: number) => {
    let moves = [];
    let array = await getKeysCopy(list, size);
    if (Name === 1) {
      moves = await bubbleSort(array, array.length);
    }
    if (Name === 2) {
      moves = await selectionSort(array, array.length);
    }
    if (Name === 3) {
      moves = await insertionSort(array, array.length);
    }
    if (Name === 4) {
      moves = await mergeSort(array, array.length);
    }
    if (Name === 5) {
      moves = await quickSort(array, array.length);
    }
    if (Name === 6) {
      moves = await heapSort(array, array.length);
    }
    if (Name === 7) {
      moves = await twistSort(array, array.length);
    }
    return moves;
  };

  // for visualizing obtained moves
  const visualizeMoves = async (moves) => {
    if (moves.length === 0) {
      return;
    }
    // if move length if 4, then we have to handle range part
    if (moves[0].length === 4) {
      await visualizeMovesInRange(moves);
    } else {
      await visualizeMovesBySwapping(moves);
    }
  };

  // for visualizing range based sorting algorithms
  const visualizeMovesInRange = async (Moves) => {
    let prevRange = [];
    while (Moves.length > 0 && Moves[0].length === 4) {
      // change range only when required to avoid blinking
      if (prevRange !== Moves[0][3]) {
        await updateElementClass(prevRange, NORMAL);
        prevRange = Moves[0][3];
        await updateElementClass(Moves[0][3], CURRENT);
      }
      await updateElementValue([Moves[0][0], Moves[0][1]]);
      Moves.shift();
    }
    await visualizeMoves(Moves);
  };

  // for visualizing swapping based sorting algorithms
  const visualizeMovesBySwapping = async (Moves) => {
    while (Moves.length > 0) {
      let currMove = Moves[0];
      // if container doesn't contains 3 elements then return
      if (currMove.length !== 3) {
        await visualizeMoves(Moves);
        return;
      } else {
        let indexes = [currMove[0], currMove[1]];
        await updateElementClass(indexes, CURRENT);
        if (currMove[2] === SWAP) {
          await updateList(indexes);
        }
        await updateElementClass(indexes, NORMAL);
      }
      Moves.shift();
    }
  };

  // swapping the values for current move
  const updateList = async (indexes: number[]) => {
    let array = [...list];
    let stored = array[indexes[0]].key;
    array[indexes[0]].key = array[indexes[1]].key;
    array[indexes[1]].key = stored;
    await updateStateChanges(array);
  };

  // update value of list element
  const updateElementValue = async (indexes: number[]) => {
    let array = [...list];
    array[indexes[0]].key = indexes[1];
    await updateStateChanges(array);
  };

  // update classType of list element
  const updateElementClass = async (indexes, classType) => {
    let array = [...list];

    for (let i = 0; i < indexes.length; ++i) {
      array[indexes[i]].classType = classType;
    }
    await updateStateChanges(array);
  };

  // Updating the state attribute list every time on modification
  const updateStateChanges = async (newList) => {
    // this.setState({ list: newList });
    setList(newList);
    await pause(speed);
  };

  // To block changing of navbar options when the algorithm is running
  const lock = (status) => {
    // this.setState({ running: Boolean(status) });
    setRunning(Boolean(status));
  };

  // Mark list as done
  const done = async () => {
    let indexes = [];
    for (let i = 0; i < size; ++i) {
      indexes.push(i);
    }
    await updateElementClass(indexes, DONE);
  };

  // For responsive navbar
  const response = () => {
    let Navbar = document.querySelector(".navbar");
    if (Navbar.className === "navbar") Navbar.className += " responsive";
    else Navbar.className = "navbar";
  };

  useEffect(() => {
    onChange();
    generateList();
  }, [size, speed, algorithm]);

  return (
    <React.Fragment>
      <SortingNavbar
        start={start}
        response={response}
        newList={generateList}
        onChange={onChange}
      />
      {list && <Frame list={list} />}
    </React.Fragment>
  );
};

export default SortingVisualizer;
