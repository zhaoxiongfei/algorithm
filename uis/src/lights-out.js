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

  const resolve = (str, rows = 6, cols = 5) => {
    const matrix = [];
    // TODO 未完待续
    for (let row = 0; row < rows; row += 1) {
      const r = [];
      for (let col = 0; col < cols; col += 1) {
        const v = resolveStr[row * cols + col] | 0;
        r.push(v);
      }
      matrix.push(r);
    }
    return matrix;
  };

  class MyComponent extends React.Component {
    state = {
      lights: init(),
      resolves: null,
      showResolve: false
    };

    turn(r, c) {
      const { lights, showResolve, resolves } = this.state;
      press(lights, r, c);
      if (showResolve && resolves) resolves[r][c] = 0;
      this.setState({ lights });
    }

    reset() {
      this.setState({ lights: restore(initValue) });
    }

    restart() {
      this.setState({ lights: init(), resolves: null });
    }

    resolve() {
      const { showResolve } = this.state;
      if (showResolve === false) {
        this.setState({ resolves: resolve(initValue), showResolve: true });
      } else {
        this.setState({ resolves: null, showResolve: false });
      }
    }

    render() {
      const { lights, resolves, showResolve } = this.state;
      return (
        <div>
          <h3>灭灯问题</h3>
          <Alert variant="primary">请设法关闭所有的灯</Alert>
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
