const cfg = {
  chessSize: 22,
  colors: {
    red: '#F3DDB8',
    black: '#113311'
  },
  font: '21px SimHei, STHeiti',
  fontColors: {
    red: 'red',
    black: 'white'
  },
  background: '#E7C275',
  lineWidth: 2,
  lineColor: 'black',
  hintColor: 'cyan',
  hintWidth: 4,
  hintSize: 22,
  startPos: {
    red: {
      general: [{ r: 9, c: 4 }],
      advisor: [{ r: 9, c: 3 }, { r: 9, c: 5 }],
      elephant: [{ r: 9, c: 2 }, { r: 9, c: 6 }],
      horse: [{ r: 9, c: 1 }, { r: 9, c: 7 }],
      chariot: [{ r: 9, c: 0 }, { r: 9, c: 8 }],
      cannon: [{ r: 7, c: 1 }, { r: 7, c: 7 }],
      soldier: [
        { r: 6, c: 0 },
        { r: 6, c: 2 },
        { r: 6, c: 4 },
        { r: 6, c: 6 },
        { r: 6, c: 8 }
      ]
    },
    black: {
      general: [{ r: 0, c: 4 }],
      advisor: [{ r: 0, c: 3 }, { r: 0, c: 5 }],
      elephant: [{ r: 0, c: 2 }, { r: 0, c: 6 }],
      horse: [{ r: 0, c: 1 }, { r: 0, c: 7 }],
      chariot: [{ r: 0, c: 0 }, { r: 0, c: 8 }],
      cannon: [{ r: 2, c: 1 }, { r: 2, c: 7 }],
      soldier: [
        { r: 3, c: 0 },
        { r: 3, c: 2 },
        { r: 3, c: 4 },
        { r: 3, c: 6 },
        { r: 3, c: 8 }
      ]
    }
  }
};
const constants = {
  types: {
    general: 0,
    advisor: 1,
    elephant: 2,
    horse: 3,
    chariot: 4,
    cannon: 5,
    soldier: 6
  },
  sides: {
    black: 0,
    red: 1
  },
  states: {
    selecting: 0,
    moving: 1
  }
};
