(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Table, Button } = ReactBootstrap;

  // Random function , return 0 or 1;
  const random = () => (Math.random() > 0.5 ? 1 : 0);

  let initValue = ""; // 初始化值，利用0/1记录的字符串
  const init = (rows = 6, cols = 5) => {
    const matrix = [];
    const values = [];
    for (let row = 0; row < rows; row += 1) {
      const r = [];
      for (let col = 0; col < cols; col += 1) {
        const v = random();
        values.push(v);
        r.push(v);
      }
      matrix.push(r);
    }
    initValue = values.join("");
    return matrix;
  };

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
        const v = str[row * cols + col] | 0;
        r.push(v);
      }
      matrix.push(r);
    }
    return matrix;
  };

  class MyComponent extends React.Component {
    state = {
      lights: init()
    };

    turn(r, c) {
      const { lights } = this.state;
      turn(lights, r, c); // self
      turn(lights, r, c - 1); // left
      turn(lights, r, c + 1); // right
      turn(lights, r - 1, c); // up
      turn(lights, r + 1, c); // down

      this.setState({ lights: [].concat(lights) });
    }

    reset() {
      this.setState({ lights: restore(initValue) });
    }

    restart() {
      this.setState({ lights: init(), resolves: null });
    }

    resolve() {
      this.setState({ resolves: resolve(initValue) });
    }

    render() {
      const { lights, resolves } = this.state;
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
            <Button variant="success" onClick={this.resolve.bind(this)}>
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
                      {resolves && resolves[rIndex][cIndex] ? "点击" : "　"}
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
