class Chessboard {
  constructor(l) {
    this.state = [];
    this.height = 11 * l;
    this.width = 10 * l;
    this.l = l;
    this.initChessboard();
  }

  render() {
    this.drawBoard(vc);
    this.drawChess(vc);
  }

  drawBoard(ctx) {
    const l = this.l;
    // draw background
    ctx.fillStyle = cfg.background;
    ctx.fillRect(0, 0, this.width, this.height);
    // draw horizontal lines
    ctx.strokeStyle = cfg.lineColor;
    ctx.lineWidth = cfg.lineWidth;
    for (let i = 1; i <= 10; i++) {
      this.drawLine(ctx, l, i * l, 9 * l, i * l);
    }
    // draw vertical lines
    for (let i = 1; i <= 9; i++) {
      if (i === 1 || i === 9) {
        this.drawLine(ctx, i * l, l, i * l, 10 * l);
      } else {
        this.drawLine(ctx, i * l, l, i * l, 5 * l);
        this.drawLine(ctx, i * l, 6 * l, i * l, 10 * l);
      }
    }
    // draw x lines
    this.drawLine(ctx, 4 * l, l, 6 * l, 3 * l);
    this.drawLine(ctx, 4 * l, 3 * l, 6 * l, l);
    this.drawLine(ctx, 4 * l, 8 * l, 6 * l, 10 * l);
    this.drawLine(ctx, 4 * l, 10 * l, 6 * l, 8 * l);
  }

  drawChess(ctx) {
    const chessList = Object.values(this.state)
      .flat(2)
      .filter(el => {
        return el != null;
      });
    chessList.forEach(chess => {
      let { x, y } = this.getChessPos(chess);
      chess.render(ctx, x, y);
    });
  }

  getChessPos(chess) {
    const row = chess.row;
    const col = chess.col;
    const l = this.l;
    return {
      x: (col + 1) * l,
      y: (row + 1) * l
    };
  }

  drawLine(ctx, xi, yi, xf, yf) {
    ctx.moveTo(xi, yi);
    ctx.lineTo(xf, yf);
    ctx.stroke();
  }

  putChess(chess) {
    // put a chess to its current position
    // called when chess position have changed
    this.state[chess.row][chess.col] = chess;
  }

  moveChess(chess, row, col) {
    // move the chess to target position
    // assumption: chess move is already valid
    this.state[chess.row][chess.col] = null;
    chess.row = row;
    chess.col = col;
    this.putChess(chess);
    this.render();
  }

  refreshChessPos() {
    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state[i].length; j++) {
        if (!this.state[i][j]) {
          continue;
        }
        this.state[i][j].row = i;
        this.state[i][j].col = j;
      }
    }
  }

  initChessboard() {
    // init state 2d array
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let c = null;
        row.push(c);
      }
      this.state.push(row);
    }

    // init chess arr
    const initArr = [
      new General(
        constants.sides.red,
        cfg.startPos.red.general[0],
        constants.types.general
      ),
      new General(
        constants.sides.black,
        cfg.startPos.black.general[0],
        constants.types.general
      ),

      new Advisor(
        constants.sides.red,
        cfg.startPos.red.advisor[0],
        constants.types.advisor
      ),
      new Advisor(
        constants.sides.red,
        cfg.startPos.red.advisor[1],
        constants.types.advisor
      ),
      new Advisor(
        constants.sides.black,
        cfg.startPos.black.advisor[0],
        constants.types.advisor
      ),
      new Advisor(
        constants.sides.black,
        cfg.startPos.black.advisor[1],
        constants.types.advisor
      ),

      new Elephant(
        constants.sides.red,
        cfg.startPos.red.elephant[0],
        constants.types.elephant
      ),
      new Elephant(
        constants.sides.red,
        cfg.startPos.red.elephant[1],
        constants.types.elephant
      ),
      new Elephant(
        constants.sides.black,
        cfg.startPos.black.elephant[0],
        constants.types.elephant
      ),
      new Elephant(
        constants.sides.black,
        cfg.startPos.black.elephant[1],
        constants.types.elephant
      ),

      new Horse(
        constants.sides.red,
        cfg.startPos.red.horse[0],
        constants.types.horse
      ),
      new Horse(
        constants.sides.red,
        cfg.startPos.red.horse[1],
        constants.types.horse
      ),
      new Horse(
        constants.sides.black,
        cfg.startPos.black.horse[0],
        constants.types.horse
      ),
      new Horse(
        constants.sides.black,
        cfg.startPos.black.horse[1],
        constants.types.horse
      ),

      new Chariot(
        constants.sides.red,
        cfg.startPos.red.chariot[0],
        constants.types.chariot
      ),
      new Chariot(
        constants.sides.red,
        cfg.startPos.red.chariot[1],
        constants.types.chariot
      ),
      new Chariot(
        constants.sides.black,
        cfg.startPos.black.chariot[0],
        constants.types.chariot
      ),
      new Chariot(
        constants.sides.black,
        cfg.startPos.black.chariot[1],
        constants.types.chariot
      ),

      new Cannon(
        constants.sides.red,
        cfg.startPos.red.cannon[0],
        constants.types.cannon
      ),
      new Cannon(
        constants.sides.red,
        cfg.startPos.red.cannon[1],
        constants.types.cannon
      ),
      new Cannon(
        constants.sides.black,
        cfg.startPos.black.cannon[0],
        constants.types.cannon
      ),
      new Cannon(
        constants.sides.black,
        cfg.startPos.black.cannon[1],
        constants.types.cannon
      ),

      new Soldier(
        constants.sides.red,
        cfg.startPos.red.soldier[0],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.red,
        cfg.startPos.red.soldier[1],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.red,
        cfg.startPos.red.soldier[2],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.red,
        cfg.startPos.red.soldier[3],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.red,
        cfg.startPos.red.soldier[4],
        constants.types.soldier
      ),

      new Soldier(
        constants.sides.black,
        cfg.startPos.black.soldier[0],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.black,
        cfg.startPos.black.soldier[1],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.black,
        cfg.startPos.black.soldier[2],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.black,
        cfg.startPos.black.soldier[3],
        constants.types.soldier
      ),
      new Soldier(
        constants.sides.black,
        cfg.startPos.black.soldier[4],
        constants.types.soldier
      )
    ];

    // put to state
    initArr.forEach(chess => {
      this.putChess(chess);
    });

    this.render();
  }
}
