(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Button, InputGroup, FormControl } = ReactBootstrap;

  const tmp = {};
  const settingTemp = (key, e) => {
    tmp[key] = e.currentTarget.value;
  };

  const resovle = (n, src, mid, dest, resovles) => {
    if (n === 1) {
      resovles.push([src, dest]);
      return;
    }
    resovle(n - 1, src, dest, mid, resovles);
    resovles.push([src, dest]);
    resovle(n - 1, mid, src, dest, resovles);
  };

  class MyComponent extends React.Component {
    state = {
      num: 10,
      towerA: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      towerB: [],
      towerC: [],
      blockMove: false,
      timeout: 300, // 没走一步间隔时间
      showResolve: false
    };

    constructor() {
      super();

      this.init(this.state);
    }

    activeSetting = () => {
      const num = Math.min(20, Math.max(1, tmp.num | 0));
      const timeout = Math.min(100000, Math.max(100, tmp.timeout | 0));
      this.init({ num, timeout });

      this.setState({ num, timeout });
    };

    resovle = () => {
      const { timeout, towerA, towerB, towerC, num } = this.state;
      const plates = {
        A: towerA,
        B: towerB,
        C: towerC
      };
      const resovles = [];
      resovle(num, "A", "B", "C", resovles);
      this.play(resovles, plates, timeout);
    };

    play(resovles, plates, timeout) {
      const [src, dest] = resovles.shift();
      plates[dest].push(plates[src].pop());

      this.setState({ towerA: plates.A, towerB: plates.B, towerC: plates.C });
      setTimeout(() => {
        this.play(resovles, plates, timeout);
      }, timeout);
    }

    init({ num }) {
      const plates = [];
      for (let i = 0; i < num; i += 1) plates.push(num - i);

      this.setState({
        towerA: plates,
        towerB: [],
        towerC: []
      });
    }

    restart() {
      this.init(this.state);
    }

    render() {
      const { num, towerA, towerB, towerC, showResolve, timeout } = this.state;
      const height = num * 20 + 120;

      return (
        <div>
          <h3>汉诺塔</h3>
          <Alert variant="primary">将 A 塔上的盘子移动到 C 塔上</Alert>
          <div style={{ paddingBottom: 10 }}>
            <div style={{ float: "left", width: 500 }}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>盘子数/播放间隔</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  defaultValue={num}
                  placeholder="盘子数"
                  aria-label="盘子数设置 1 ~ 20"
                  onChange={settingTemp.bind(null, "num")}
                />
                <FormControl
                  defaultValue={timeout}
                  placeholder="播放间隔"
                  aria-label="播放间隔毫秒数"
                  onChange={settingTemp.bind(null, "timeout")}
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
              width="100%"
              height={height}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                background: "#f6f6f6",
                border: "1px solid #ddd",
                borderRadius: "4px",
                margin: "20 auto",
                overflow: "auto"
              }}
            >
              <g>
                <rect y={height - 65} x="5%" width="20%" height="30" />
                {towerA.map((x, i) => {
                  const px = 6 + ((num - x) * 18) / (2 * num);
                  const py = height - 80 - 5 - i * 20;
                  const width = (18 * x) / num;
                  return (
                    <g className="plate">
                      <rect
                        y={py}
                        x={`${px}%`}
                        width={`${width}%`}
                        fill="green"
                        height={15}
                      />
                      <text x={`${px + width / 2}%`} y={py + 9} fill="#ffffff">
                        {x}
                      </text>
                    </g>
                  );
                })}
                <text x="15%" y={height - 80 + 60}>
                  A
                </text>
              </g>
              <g>
                <rect y={height - 65} x="40%" width="20%" height="30" />
                {towerB.map((x, i) => {
                  const px = 41 + ((num - x) * 18) / (2 * num);
                  const py = height - 80 - 5 - i * 20;
                  const width = (18 * x) / num;
                  return (
                    <g className="plate">
                      <rect
                        y={py}
                        x={`${px}%`}
                        width={`${width}%`}
                        fill="green"
                        height={15}
                      />
                      <text x={`${px + width / 2}%`} y={py + 9} fill="#ffffff">
                        {x}
                      </text>
                    </g>
                  );
                })}
                <text x="50%" y={height - 80 + 60}>
                  B
                </text>
              </g>
              <g>
                <rect y={height - 65} x="75%" width="20%" height="30" />
                {towerC.map((x, i) => {
                  const px = 76 + ((num - x) * 18) / (2 * num);
                  const py = height - 80 - 5 - i * 20;
                  const width = (18 * x) / num;
                  return (
                    <g className="plate">
                      <rect
                        y={py}
                        x={`${px}%`}
                        width={`${width}%`}
                        fill="green"
                        height={15}
                      />
                      <text x={`${px + width / 2}%`} y={py + 9} fill="#ffffff">
                        {x}
                      </text>
                    </g>
                  );
                })}
                <text x="85%" y={height - 80 + 60}>
                  C
                </text>
              </g>
            </svg>
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById("root"));
})();
