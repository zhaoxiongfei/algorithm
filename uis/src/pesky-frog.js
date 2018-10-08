(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Button, InputGroup, FormControl, Badge } = ReactBootstrap;

  let rowLines;
  let colLines;
  let nodes;

  class MyComponent extends React.Component {
    state = {
      space: 40, // 画布边缘留白大小
      step: 60, // 水稻间距
      rows: 6,
      cols: 7,
      damaged: [],
      unsolvable: false,
      showResolve: false
    };

    constructor() {
      super();

      this.init();
    }

    settingDamaged(row, col) {
      const { damaged } = this.state;
      damaged.push([row, col]);

      this.setState({ damaged });
    }

    removeDamaged(row, col) {
      let { damaged } = this.state;

      damaged = damaged.filter(([r, c]) => r !== row || c !== col);

      this.setState({ damaged });
    }

    init() {
      const { rows, cols, space, step } = this.state;
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

    restart() {
      this.setState({
        damaged: [],
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
          {unsolvable && <Alert variant="danger">该题无解</Alert>}
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
                />
                <FormControl
                  placeholder="列数"
                  defaultValue={cols}
                  aria-label="列数设置"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary">设置</Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div style={{ float: "right", width: 300, textAlign: "right" }}>
              <Button variant="danger" onClick={this.restart.bind(this)}>
                重新开始
              </Button>{" "}
              <Button variant="success" active={showResolve}>
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
          </svg>
        </div>
      );
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById("root"));
})();
