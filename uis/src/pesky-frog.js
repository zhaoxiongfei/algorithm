(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Button, InputGroup, FormControl, Badge } = ReactBootstrap;

  let rowLines;
  let colLines;
  let nodes;

  const resolve = (damaged, rows, cols) => {
    const { length } = damaged;
    damaged.sort(([y1, x1], [y2, x2]) => {
      if (x1 > x2) return 1;
      if (x1 < x2) return -1;
      if (y1 > y2) return 1;
      return -1;
    });

    const dict = {};
    damaged.forEach(([r, c]) => {
      if (!dict[r]) dict[r] = {};
      dict[r][c] = true;
    });

    let resolves;
    let maxStep = 2;
    for (let i = 0; i < length - 1; i += 1) {
      for (let j = i + 1; j < length; j += 1) {
        const first = damaged[i];
        const second = damaged[j];
        const [y1, x1] = first;
        const [y2, x2] = second;
        const dx = x2 - x1; // 计算横轴偏移量
        const dy = y2 - y1; // 计算纵轴偏移量

        const px = x1 - dx; // 第一个点的上一个点x坐标
        const py = y1 - dy; // 第一个点的上一个点y坐标
        // 1. 判断第一个点的上一个趋势点是否在田内, 如果在田内说明第二个点不对，跳过检测下一个第二点
        if (px >= 0 && py < rows && py >= 0) continue;

        const mx = x1 + maxStep * dx; // 按照目前最大路径后的点x坐标
        const my = y1 + maxStep * dy; // 按照目前最大路径后的点y坐标
        // 2. 判断第一个点经过当前最大路径后是否已经在田外，如果在田外说明第二个点不对
        if (mx > cols) break;
        if (my > rows || my < 0) continue;

        const paths = [first, second];
        // 3. 按照趋势逐步判断第三、第四、第五....点
        let x = x2 + dx;
        let y = y2 + dy;
        while (dict[y] && dict[y][x]) {
          paths.push([y, x]);
          x += dx;
          y += dy;
        }
        // 如果最后一个点的下一个点在田内，则路径不合法, 第二点重新选择
        if (x < cols && y < rows && y >= 0) continue;

        if (paths.length > maxStep) {
          resolves = paths;
          maxStep = resolves.length;
        }
      }
    }

    if (maxStep === 2) throw Error("unsolvable");
    return resolves;
  };

  const tmp = {};
  const settingTemp = (key, e) => {
    tmp[key] = e.currentTarget.value;
  };

  class MyComponent extends React.Component {
    state = {
      space: 40, // 画布边缘留白大小
      step: 60, // 水稻间距
      rows: 10,
      cols: 10,
      damaged: [],
      resolves: [],
      unsolvable: false,
      showResolve: false
    };

    constructor() {
      super();

      this.init(this.state);
    }

    settingDamaged(row, col) {
      const { damaged } = this.state;
      damaged.push([row, col]);

      this.setState({ damaged });
    }

    activeRowsCols = () => {
      const rows = Math.min(100, Math.max(5, tmp.rows | 0));
      const cols = Math.min(100, Math.max(5, tmp.cols | 0));
      this.init({ rows, cols });

      this.setState({
        rows,
        cols
      });
    };

    removeDamaged(row, col) {
      let { damaged } = this.state;

      damaged = damaged.filter(([r, c]) => r !== row || c !== col);

      this.setState({ damaged });
    }

    init({ rows, cols }) {
      const { space, step } = this.state;
      rowLines = [];
      for (let r = 0; r < rows; r += 1) {
        const y = space + r * step;
        rowLines.push(
          <line
            x1={space}
            y1={y}
            x2={space + (cols - 1) * step}
            y2={y}
            stroke="green"
          />
        );
      }

      colLines = [];
      for (let c = 0; c < cols; c += 1) {
        const x = space + c * step;
        colLines.push(
          <line
            x1={x}
            y1={space}
            x2={x}
            y2={space + (rows - 1) * step}
            stroke="green"
          />
        );
      }

      nodes = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          nodes.push(
            <circle
              onClick={this.settingDamaged.bind(this, r, c)}
              cx={space + c * step}
              cy={space + r * step}
              r={step / 4}
              fill="green"
            />
          );
        }
      }
    }

    resolve() {
      const { damaged, rows, cols, showResolve } = this.state;

      if (showResolve)
        return this.setState({ showResolve: false, resolves: [] });

      let resolves;
      try {
        resolves = resolve(damaged, rows, cols);
      } catch (e) {
        console.error(e);
        return this.setState({
          showResolve: false,
          resolves: [],
          unsolvable: true
        });
      }
      return this.setState({ showResolve: true, resolves });
    }

    restart() {
      this.setState({
        damaged: [],
        resolves: [],
        showResolve: false,
        unsolvable: false
      });
    }

    render() {
      const {
        space,
        step,
        rows,
        cols,
        damaged,
        resolves,
        showResolve,
        unsolvable
      } = this.state;
      const width = (cols - 1) * step + space * 2;
      const height = (rows - 1) * step + space * 2;

      const damagedNodes = damaged.map(([r, c]) => (
        <circle
          onClick={this.removeDamaged.bind(this, r, c)}
          cx={space + c * step}
          cy={space + r * step}
          r={1 + step / 4}
          fill="black"
        />
      ));

      return (
        <div>
          <h3>讨厌的青蛙</h3>
          <Alert variant="primary">点击网格交点设置一些损坏点</Alert>
          <div style={{ paddingBottom: 10 }}>
            <div style={{ float: "left", width: 500 }}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>行数/列数</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  defaultValue={rows}
                  placeholder="行数"
                  aria-label="行数设置"
                  onChange={settingTemp.bind(null, "rows")}
                />
                <FormControl
                  placeholder="列数"
                  defaultValue={cols}
                  aria-label="列数设置"
                  onChange={settingTemp.bind(null, "cols")}
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    onClick={this.activeRowsCols}
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
                onClick={this.resolve.bind(this)}
                active={showResolve}
              >
                求解
              </Button>
            </div>
          </div>
          <div style={{ clear: "both" }}>
            <Alert variant="success">
              已设置损坏点:{" "}
              <Badge pill variant="danger">
                {damaged.length}
              </Badge>{" "}
              个
            </Alert>
            {unsolvable && <Alert variant="danger">该题无解</Alert>}
          </div>

          <svg
            width={width}
            height={height}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              background: "#f6f6f6",
              border: "1px solid #ddd",
              borderRadius: "4px",
              overflow: "auto"
            }}
          >
            {rowLines}
            {colLines}
            {nodes}
            {damagedNodes}
            {showResolve &&
              resolves.map(([r, c]) => (
                <circle
                  cx={space + c * step}
                  cy={space + r * step}
                  r={step / 4}
                  stroke="yellow"
                  strokeWidth="3"
                  fill="none"
                />
              ))}
          </svg>
        </div>
      );
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById("root"));
})();
