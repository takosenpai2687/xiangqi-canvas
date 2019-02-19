class Game {
  constructor() {
    this.chessboard = new Chessboard(viewer.height / 11);
    this.offsetX = controller.getBoundingClientRect().left;
    this.offsetY = controller.getBoundingClientRect().top;
    this.render();
    this.turn = constants.sides.red;
    this.handleTurnChange();
    this.state = constants.states.selecting;
    this.undoStack = [Object.values($.extend(true, {}, this.chessboard.state))];
    this.nextSteps = [];
    this.current = null;
    this.handleClick = this.handleClick.bind(this);
    this.undo = this.undo.bind(this);
    controller.addEventListener('click', this.handleClick);
    this.originalWidth = controller.width;
    this.originalHeight = controller.height;
  }

  render() {
    this.chessboard.render();
  }

  undo() {
    if (this.undoStack.length < 2) {
      return;
    }
    this.undoStack.pop();
    this.chessboard.state = Object.values(
      $.extend(true, {}, this.undoStack[this.undoStack.length - 1])
    );
    this.chessboard.refreshChessPos();
    this.turn = 1 - this.turn;
    this.handleTurnChange();
    this.state = constants.states.selecting;
    this.nextSteps = [];
    this.current = null;

    this.render();
  }

  handleClick(e) {
    let { r, c } = this.getClickedPos(e);
    // if not clicked on a chess point, return
    if (r < 0 || c < 0 || c > 8 || r > 9) {
      return;
    }
    // you haven't selected a chess
    if (this.state === constants.states.selecting) {
      // if selected none or enemy chess, return
      if (
        !this.chessboard.state[r][c] ||
        this.chessboard.state[r][c].side !== this.turn
      ) {
        return;
      }
      this.handleSelect(this.chessboard.state[r][c]);
    } else {
      // you selected a chess, but not yet moved
      // check if its reselect situation
      if (
        this.chessboard.state[r][c] &&
        this.chessboard.state[r][c].side === this.turn
      ) {
        this.handleSelect(this.chessboard.state[r][c]);
      }
      // check if clicked point is valid
      let moveValid = false;
      this.nextSteps.forEach(step => {
        if (r === step.row && c === step.col) {
          moveValid = true;
        }
      });
      if (!moveValid) {
        return;
      }
      this.handleMove(this.current, r, c);
    }
  }

  handleSelect(chess) {
    // given the chess
    // assuming valid selection
    this.current = chess;
    this.nextSteps = chess.getNextSteps(this.chessboard.state);
    this.drawHint(this.nextSteps);
    this.state = constants.states.moving;
  }

  handleTurnChange() {
    if (this.turn === constants.sides.red) {
      $('.red-tools').toggleClass('active');
      $('.black-tools').removeClass('active');
    } else {
      $('.black-tools').toggleClass('active');
      $('.red-tools').removeClass('active');
    }
  }

  handleMove(chess, r, c) {
    // given the chess to move
    // assuming valid move
    this.chessboard.moveChess(chess, r, c);
    let winner = this.checkWin();
    if (winner) {
      this.handleWin(winner);
    } else {
      this.undoStack.push(
        Object.values($.extend(true, {}, this.chessboard.state))
      );
      this.turn = 1 - this.turn;
      this.handleTurnChange();
      this.state = constants.states.selecting;
      this.nextSteps = [];
      this.current = null;
    }
    cc.clearRect(0, 0, controller.width, controller.height);
  }

  checkWin() {
    let generalList = this.chessboard.state.flat(2).filter(chess => {
      return chess != null && chess.type === constants.types.general;
    });
    if (generalList.length === 2) {
      return null;
    } else if ((generalList[0].side = constants.sides.red)) {
      return 'Red';
    } else {
      return 'Black';
    }
  }

  handleWin(winner) {
    if (alert(winner + ' wins.')) {
    } else {
      window.location.reload();
    }
  }

  drawHint(steps) {
    cc.strokeStyle = cfg.hintColor;
    cc.lineWidth = cfg.hintWidth;
    cc.clearRect(0, 0, controller.width, controller.height);
    steps.forEach(step => {
      let r = step.row;
      let c = step.col;
      let { x, y } = this.getCanvasPos(r, c);
      cc.moveTo(x, y);
      cc.beginPath();
      cc.arc(x, y, cfg.hintSize, 0, Math.PI * 2, false);
      cc.stroke();
      cc.closePath();
    });
  }

  getClickedPos(e) {
    const x = e.clientX - this.offsetX;
    const y = e.clientY - this.offsetY;
    const r = Math.round(y / this.chessboard.l) - 1;
    const c = Math.round(x / this.chessboard.l) - 1;
    return { r, c };
  }

  getCanvasPos(r, c) {
    return { x: (c + 1) * this.chessboard.l, y: (r + 1) * this.chessboard.l };
  }

  resize() {
    const ratio = controller.height / this.originalHeight;
    this.originalHeight = controller.height;
    this.chessboard.l *= ratio;
    this.render();
  }
}
