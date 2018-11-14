(() => {
  const { React, ReactDOM, ReactBootstrap } = window;
  const { Alert, Button } = ReactBootstrap;

  const vectorArea = ([px, py], [qx, qy], [sx, sy]) =>
    px * qy - py * qx + qx * sy - qy * sx + sx * py - sy * px;

  const scan = points => {
    const t = points.slice();
    const s = [];
    s.push(t.pop()); // 第一个点入栈
    s.push(t.pop()); // 第二个点入栈

    while (t.length) {
      const area = vectorArea(
        s[s.length - 2],
        s[s.length - 1],
        t[t.length - 1]
      );
      if (area > 0) {
        s.push(t.pop());
      } else {
        s.pop();
        if (area === 0 || s.length === 1) s.push(t.pop());
      }
    }

    return s;
  };

  const findPole = points => {
    const { length } = points;
    if (length === 0) return [];
    points.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

    let index = 0;
    for (let i = 1; i < length; i += 1) {
      const curr = points[i];
      const prev = points[i - 1];
      if (curr[0] !== prev[0] || curr[1] !== prev[1])
        points[(index += 1)] = curr;
    }
    points.length = index + 1;
    if (points.length < 3) return [];

    const tops = scan(points);
    const bottoms = scan(points.reverse());

    bottoms.length -= 1;
    tops.length -= 1;
    if (bottoms.length + tops.length < 3) return [];
    return bottoms.concat(tops);
  };

  class MyComponent extends React.Component {
    state = {
      resovles: [],
      points: [],
      height: 600,
      showResolve: false
    };

    addPoint = e => {
      const { points } = this.state;
      points.push([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      this.setState({ points });
    };

    resovle = () => {
      const { points } = this.state;
      const resovles = findPole(points);
      this.setState({ resovles, showResolve: true });
    };

    restart() {
      this.setState({
        resovles: [],
        points: [],
        showResolve: false
      });
    }

    render() {
      const { height, showResolve, resovles, points } = this.state;

      return (
        <div>
          <h3>Convex hull</h3>
          <Alert variant="primary">在Board上随机点一些点</Alert>
          <div style={{ paddingBottom: 10 }}>
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
              <rect
                y={0}
                x={0}
                width={height}
                height={height}
                onClick={this.addPoint}
              />
              {points.map(([cx, cy]) => (
                <circle cx={cx} cy={cy} r="5" fill="red" />
              ))}
              {showResolve &&
                resovles.length &&
                resovles.map(([cx, cy]) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6"
                    fill="none"
                    stroke="yellow"
                    strokeWidth="2px"
                  />
                ))}
              {showResolve &&
                resovles.length && (
                  <polygon
                    points={resovles.map(x => x.join(",")).join(" ")}
                    style={{
                      fill: "none",
                      stroke: "blue",
                      strokeWidth: 2
                    }}
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
