(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Table, Button } = ReactBootstrap;

  const turn = (lights, r, c) => {
    const row = lights[r];
    if (row === undefined) return;
    const current = row[c];
    if (current === undefined) return;
    if (current === 1) {
      lights[r][c] = 0;
    } else if (current === 0) {
      lights[r][c] = 1;
    }
  };

  const press = (lights, row, col) => {
    turn(lights, row, col); // self
    turn(lights, row, col - 1); // left
    turn(lights, row, col + 1); // right
    turn(lights, row - 1, col); // up
    turn(lights, row + 1, col); // down
  };

  // Random press light
  let resolveStr = "";
  const random = (lights, rows, cols) => {
    const vs = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const status = Math.random() > 0.5 ? 1 : 0;
        vs.push(status);
        if (status === 1) press(lights, row, col);
      }
    }
    resolveStr = vs.join("");
    console.log("resolve: %s", resolveStr);
  };

  let initValue = ""; // 初始化值，利用0/1记录的字符串
  const init = (rows = 6, cols = 5) => {
    const matrix = [];
    for (let row = 0; row < rows; row += 1) {
      const r = [];
      for (let col = 0; col < cols; col += 1) {
        r.push(0);
      }
      matrix.push(r);
    }
    random(matrix, rows, cols);
    initValue = matrix.map(x => x.join("")).join("");
    return matrix;
  };

  const restore = (str, rows = 6, cols = 5) => {
    const matrix = [];
    for (let row = 0; row < rows; row += 1) {
      const r = [];
      for (let col = 0; col < cols; col += 1) {
        const v = str[row * cols + col] | 0;
        r.push(v);
      }
      matrix.push(r);
    }
    return matrix;
  };

  const check = (lights, presses) => {
    const rows = lights.length;
    const cols = lights[0].length;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (!presses[r + 1]) presses[r + 1] = [];
        presses[r + 1][c] =
          (lights[r][c] +
            presses[r][c] +
            (presses[r - 1] ? presses[r - 1][c] | 0 : 0) +
            (presses[r][c - 1] | 0) +
            (presses[r][c + 1] | 0)) %
          2;
      }
    }

    for (let c = 0; c < cols; c += 1) {
      if (
        ((presses[rows - 1][c - 1] | 0) +
          presses[rows - 1][c] +
          (presses[rows - 1][c + 1] | 0) +
          presses[rows - 2][c]) %
        2 !==
        lights[rows - 1][c]
      )
        return false;
    }

    return true;
  };

  const resolve = lights => {
    const cols = lights[0].length;
    let maxValue = 2 ** cols;
    while (maxValue > 0) {
      maxValue -= 1;
      const valueBinary = maxValue.toString(2);
      const len = valueBinary.length;
      const first = [];
      first.length = cols;
      first.fill(0);
      for (let c = 0; c < len; c += 1)
        first[cols - len + c] = valueBinary[c] | 0;
      console.log("first row: %s", first.join(""));
      const presses = [first];
      if (check(lights, presses)) return presses;
    }
    throw Error("unsolvable");
  };

  class MyComponent extends React.Component {
    state = {
      lights: init(),
      resolves: null,
      unsolvable: false,
      showResolve: false
    };

    turn(r, c) {
      const { lights, showResolve, resolves } = this.state;
      press(lights, r, c);
      if (showResolve && resolves) resolves[r][c] = 0;
      this.setState({ lights });
    }

    reset() {
      this.setState({
        lights: restore(initValue),
        resolves: null,
        showResolve: false,
        unsolvable: false
      });
    }

    restart() {
      this.setState({
        lights: init(),
        resolves: null,
        showResolve: false,
        unsolvable: false
      });
    }

    resolve() {
      const { showResolve, lights } = this.state;
      if (showResolve === false) {
        let resolves;
        console.log(lights);
        try {
          resolves = resolve(lights);
          console.log(resolves);
        } catch (e) {
          console.log("unsolvable");
          this.setState({ unsolvable: true });
          return;
        }
        this.setState({ resolves, showResolve: true, unsolvable: false });
      } else {
        this.setState({
          resolves: null,
          showResolve: false,
          unsolvable: false
        });
      }
    }

    render() {
      const { lights, resolves, showResolve, unsolvable } = this.state;
      return (
        <div>
          <h3>灭灯问题</h3>
          <Alert variant="primary">请设法关闭所有的灯</Alert>
          {unsolvable && <Alert variant="danger">该题无解</Alert>}
          <div style={{ paddingBottom: 10, textAlign: "right" }}>
            <Button variant="primary" onClick={this.reset.bind(this)}>
              重置
            </Button>{" "}
            <Button variant="danger" onClick={this.restart.bind(this)}>
              重新开始
            </Button>{" "}
            <Button
              variant="success"
              active={showResolve}
              onClick={this.resolve.bind(this)}
            >
              求解
            </Button>
          </div>
          <Table bordered size="lg">
            <tbody>
              {lights.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((col, cIndex) => (
                    <td
                      onClick={this.turn.bind(this, rIndex, cIndex)}
                      style={{ background: col ? "yellow" : "gray" }}
                      key={cIndex}
                    >
                      {showResolve && resolves && resolves[rIndex][cIndex]
                        ? "点击"
                        : "　　"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById("root"));
})();
