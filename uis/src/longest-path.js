(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Button, InputGroup, FormControl } = ReactBootstrap;

  const tmp = {};
  const settingTemp = (key, e) => {
    tmp[key] = e.currentTarget.value;
  };

  const update = (matrix, x, y, longest, height) => {
    if (matrix[y] == null) return;
    if (matrix[y][x] == null) return;
    const item = matrix[y][x];
    if (item.height <= height) return;
    if ((item.longest | 0) < longest + 1) matrix[y][x].longest = longest + 1;
  };

  const updateLongest = (matrix, sorted, idx) => {
    const point = sorted[idx];
    if (!point) return;
    const { x, y, height } = point;
    // 如果未设置最大路径值，则设置为 1
    if (!point.longest) point.longest = 1;
    // 更新周围比当前点高的的最大路径，为当前最大路径 +1
    update(matrix, x - 1, y, point.longest, height); // 左侧
    update(matrix, x + 1, y, point.longest, height); // 右侧
    update(matrix, x, y - 1, point.longest, height); // 上面
    update(matrix, x, y + 1, point.longest, height); // 下面
    updateLongest(matrix, sorted, idx + 1);
  };

  const resovle = points => {
    const matrix = [];
    const sorted = [];
    for (let y = 0; y < points.length; y += 1) {
      const line = points[y];
      matrix[y] = [];
      for (let x = 0; x < line.length; x += 1) {
        matrix[y][x] = { x, y, height: line[x] };
        sorted.push(matrix[y][x]);
      }
    }
    sorted.sort((a, b) => (a.height > b.height ? 1 : -1));
    updateLongest(matrix, sorted, 0);

    sorted.sort((a, b) => (a.longest > b.longest ? -1 : 1));
    const maxPaths = [sorted[0]];
    const nextPoint = point => {
      const { x, y, height } = point;
      let max = 0;
      let next;
      [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(([col, row]) => {
        if (matrix[row] == null) return;
        if (matrix[row][col] == null) return;
        const item = matrix[row][col];
        if (item.height >= height) return;
        if (item.longest > max) {
          max = item.longest;
          next = item;
        }
      });
      if (next) maxPaths.push(next);
      return next;
    };
    while (nextPoint(maxPaths[maxPaths.length - 1])) {}

    return maxPaths;
  };

  const init = ({ rows, cols }) => {
    const points = [];
    for (let row = 0; row < rows; row += 1) {
      points[row] = [];
      for (let col = 0; col < cols; col += 1) {
        points[row][col] = (Math.random() * rows * cols) | 0;
      }
    }
    return points;
  };

  class Field extends React.Component {
    constructor(props) {
      console.log("Field component initilize", props);
      super(props);
    }

    render() {
      const { points, rows, cols } = this.props;
      const rects = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = 60 + col * 40;
          const y = 60 + row * 40;
          rects.push(
            <g>
              <rect width="38" height="38" x={x} y={y} fill="#ffffff" />
              <text x={x + 19} y={y + 22}>
                {points[row][col]}
              </text>
            </g>
          );
        }
      }
      return rects;
    }
  }

  class MyComponent extends React.Component {
    state = {
      rows: 10,
      cols: 10,
      points: [],
      timeout: 100, // 答案播放一帧速度，单位毫秒
      showResolve: false
    };

    constructor() {
      super();

      this.state.points = init(this.state);
    }

    activeSetting = () => {
      const rows = Math.min(50, Math.max(1, tmp.rows | 0));
      const cols = Math.min(50, Math.max(1, tmp.cols | 0));
      const points = init({ rows, cols });

      this.setState({ points, rows, cols });
    };

    resovle = () => {
      const { points } = this.state;

      const resovles = resovle(points);

      this.setState({ resovles, showResolve: true });
    };

    restart() {
      const { rows, cols } = this.state;
      const points = init({ rows, cols });
      this.setState({
        points,
        showResolve: false,
        resovles: []
      });
    }

    render() {
      const { points, rows, cols, showResolve, resovles } = this.state;
      const height = rows * 40 + 120;
      const width = cols * 40 + 120;

      const paths = [];
      if (showResolve) {
        resovles.forEach(point => {
          const x = 60 + point.x * 40 + 19;
          const y = 60 + point.y * 40 + 19;
          paths.push([x, y].join(","));
        });
        paths.push(paths[paths.length - 1]);
        // 第一个点加M，代表起始点
        paths[0] = `M${paths[0]}`;

        // 第二个点加C，利用贝塞尔 C 命令
        paths[1] = `C${paths[1]}`;
      }

      return (
        <div>
          <h3>最长滑雪路径</h3>
          <Alert variant="primary">寻找最长的滑雪路径</Alert>
          <div style={{ paddingBottom: 10 }}>
            <div style={{ float: "left", width: 500 }}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>行数/列数</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  defaultValue={rows}
                  placeholder="行数"
                  aria-label="行数设置 1 ~ 50"
                  onChange={settingTemp.bind(null, "rows")}
                />
                <FormControl
                  defaultValue={cols}
                  placeholder="列数"
                  aria-label="列数设置 1 ~ 50"
                  onChange={settingTemp.bind(null, "cols")}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    onClick={this.activeSetting}
                  >
                    设置
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div style={{ float: "right", width: 300, textAlign: "right" }}>
              <Button variant="danger" onClick={this.restart.bind(this)}>
                重新开始
              </Button>{" "}
              <Button
                variant="success"
                active={showResolve}
                onClick={this.resovle}
              >
                求解
              </Button>
            </div>
          </div>

          <div style={{ clear: "both" }}>
            <svg
              width={width}
              height={height}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                background: "#eee",
                border: "1px solid #ddd",
                borderRadius: "4px",
                overflow: "auto"
              }}
            >
              <Field rows={rows} cols={cols} points={points} />
              {showResolve &&
                resovles.map(point => {
                  const x = 60 + point.x * 40;
                  const y = 60 + point.y * 40;
                  return (
                    <rect
                      x={x}
                      y={y}
                      fill="green"
                      width="38"
                      height="38"
                      opacity="0.3"
                    />
                  );
                })}
              {showResolve && (
                <path
                  d={paths.join(" ")}
                  stroke="blue"
                  fill="none"
                  style={{ strokeWidth: "2px" }}
                />
              )}
            </svg>
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById("root"));
})();
