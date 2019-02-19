class Chess {
  constructor(side, pos, type) {
    this.side = side;
    this.row = pos.r;
    this.col = pos.c;
    this.type = type;
  }

  render(ctx, x, y) {
    this.drawCircle(ctx, x, y);
    this.drawText(ctx, x, y);
  }

  drawCircle(ctx, x, y) {
    // draw circle
    ctx.fillStyle =
      this.side === constants.sides.red ? cfg.colors.red : cfg.colors.black;
    ctx.beginPath();
    ctx.arc(x, y, cfg.chessSize, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawText(ctx, x, y) {
    // draw text
    ctx.font = cfg.font;
    ctx.fillStyle =
      this.side === constants.sides.red
        ? cfg.fontColors.red
        : cfg.fontColors.black;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, x, y);
  }
}

class General extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '帥' : '將';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    return [
      { row: r - 1, col: c },
      { row: r + 1, col: c },
      { row: r, col: c - 1 },
      { row: r, col: c + 1 }
    ].filter(p => {
      return (
        (this.side === constants.sides.red
          ? p.col >= 3 && p.col <= 5 && p.row >= 7 && p.row <= 9 // red pos condition
          : p.col >= 3 && p.col <= 5 && p.row >= 0 && p.row <= 2) && // black pos condition
        (!state[p.row][p.col] || state[p.row][p.col].side !== this.side) // universal condition: must be valid point
      );
    });
  }
}

class Advisor extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '仕' : '士';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    return [
      { row: r - 1, col: c - 1 },
      { row: r - 1, col: c + 1 },
      { row: r + 1, col: c - 1 },
      { row: r + 1, col: c + 1 }
    ].filter(p => {
      return (
        (this.side === constants.sides.red
          ? p.col >= 3 && p.col <= 5 && p.row >= 7 && p.row <= 9
          : p.col >= 3 && p.col <= 5 && p.row >= 0 && p.row <= 2) &&
        (!state[p.row][p.col] || state[p.row][p.col].side !== this.side)
      );
    });
  }
}

class Elephant extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '相' : '象';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    return [
      { row: r - 2, col: c - 2 },
      { row: r - 2, col: c + 2 },
      { row: r + 2, col: c - 2 },
      { row: r + 2, col: c + 2 }
    ].filter(p => {
      return (
        (this.side === constants.sides.red
          ? p.col >= 0 && p.col <= 8 && p.row >= 5 && p.row <= 9
          : p.col >= 0 && p.col <= 8 && p.row >= 0 && p.row <= 4) &&
        (!state[p.row][p.col] || state[p.row][p.col].side !== this.side)
      );
    });
  }
}

class Horse extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '傌' : '馬';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    return [
      { row: r + 2, col: c + 1 },
      { row: r + 2, col: c - 1 },
      { row: r + 1, col: c + 2 },
      { row: r + 1, col: c - 2 },
      { row: r - 1, col: c + 2 },
      { row: r - 1, col: c - 2 },
      { row: r - 2, col: c + 1 },
      { row: r - 2, col: c - 1 }
    ].filter(p => {
      if (p.row < 0 || p.row > 9 || p.col < 0 || p.col > 8) {
        return false;
      }
      if (state[p.row][p.col] && state[p.row][p.col].side === this.side) {
        return false;
      }
      let dir = {
        row:
          p.row > this.row
            ? Math.floor((p.row - this.row) / 2)
            : Math.ceil((p.row - this.row) / 2),
        col:
          p.col > this.col
            ? Math.floor((p.col - this.col) / 2)
            : Math.ceil((p.col - this.col) / 2)
      };
      let rn = this.row + dir.row;
      let cn = this.col + dir.col;
      if (state[rn][cn]) {
        return false;
      }
      return true;
    });
  }
}

class Chariot extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '俥' : '車';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    let res = [];
    // search up
    r--;
    while (r >= 0) {
      if (!state[r][c]) {
        res.push({ row: r, col: c });
      } else if (state[r][c].side !== this.side) {
        res.push({ row: r, col: c });
        break;
      } else {
        break;
      }
      r--;
    }
    r = this.row;
    // search down
    r++;
    while (r <= 9) {
      if (!state[r][c]) {
        res.push({ row: r, col: c });
      } else if (state[r][c].side !== this.side) {
        res.push({ row: r, col: c });
        break;
      } else {
        break;
      }
      r++;
    }
    r = this.row;
    // search left
    c--;
    while (c >= 0) {
      if (!state[r][c]) {
        res.push({ row: r, col: c });
      } else if (state[r][c].side !== this.side) {
        res.push({ row: r, col: c });
        break;
      } else {
        break;
      }
      c--;
    }
    c = this.col;
    // search right
    c++;
    while (c <= 8) {
      if (!state[r][c]) {
        res.push({ row: r, col: c });
      } else if (state[r][c].side !== this.side) {
        res.push({ row: r, col: c });
        break;
      } else {
        break;
      }
      c++;
    }
    c = this.col;
    return res;
  }
}

class Cannon extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '炮' : '砲';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    let counter = 0;
    let res = [];
    // search up
    for (let i = r - 1; i >= 0; i--) {
      if (counter === 0) {
        if (!state[i][c]) {
          res.push({ row: i, col: c });
        } else {
          counter = 1;
          continue;
        }
      } else {
        if (!state[i][c]) {
          continue;
        } else if (state[i][c].side === this.side) {
          break;
        } else {
          res.push({ row: i, col: c });
          break;
        }
      }
    }
    counter = 0;
    // search down
    for (let i = r + 1; i <= 9; i++) {
      if (counter === 0) {
        if (!state[i][c]) {
          res.push({ row: i, col: c });
        } else {
          counter = 1;
          continue;
        }
      } else {
        if (!state[i][c]) {
          continue;
        } else if (state[i][c].side === this.side) {
          break;
        } else {
          res.push({ row: i, col: c });
          break;
        }
      }
    }
    counter = 0;
    // search left
    for (let i = c - 1; i >= 0; i--) {
      if (counter === 0) {
        if (!state[r][i]) {
          res.push({ row: r, col: i });
        } else {
          counter = 1;
          continue;
        }
      } else {
        if (!state[r][i]) {
          continue;
        } else if (state[r][i].side === this.side) {
          break;
        } else {
          res.push({ row: r, col: i });
          break;
        }
      }
    }
    counter = 0;
    // search right
    for (let i = c + 1; i <= 8; i++) {
      if (counter === 0) {
        if (!state[r][i]) {
          res.push({ row: r, col: i });
        } else {
          counter = 1;
          continue;
        }
      } else {
        if (!state[r][i]) {
          continue;
        } else if (state[r][i].side === this.side) {
          break;
        } else {
          res.push({ row: r, col: i });
          break;
        }
      }
    }
    counter = 0;
    return res;
  }
}

class Soldier extends Chess {
  constructor(side, pos, type) {
    super(side, pos, type);
    this.text = this.side === constants.sides.red ? '兵' : '卒';
  }

  getNextSteps(state) {
    let r = this.row;
    let c = this.col;
    let temp = [];
    if (this.side === constants.sides.red) {
      if (r >= 5) {
        temp = [{ row: r - 1, col: c }];
      } else {
        temp = [
          { row: r - 1, col: c },
          { row: r, col: c - 1 },
          { row: r, col: c + 1 }
        ];
      }
    } else {
      if (r <= 4) {
        temp = [{ row: r + 1, col: c }];
      } else {
        temp = [
          { row: r + 1, col: c },
          { row: r, col: c - 1 },
          { row: r, col: c + 1 }
        ];
      }
    }
    return temp.filter(p => {
      if (p.row < 0 || p.col < 0 || p.row > 9 || p.col > 8) {
        return false;
      }
      if (state[p.row][p.col] && state[p.row][p.col].side === this.side) {
        return false;
      }
      return true;
    });
  }
}
