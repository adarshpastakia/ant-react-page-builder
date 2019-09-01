import React from "react";
import { PageBuilderRow } from "../page-builder";
import { RpbActions } from "./Actions";
import { RpbCol } from "./Col";
import { RpbContextConsumer } from "./Context";

interface RpbRowProps {
  config?: PageBuilderRow;
}
interface RpbRowState {
  draggable?: boolean;
  config: PageBuilderRow;
}

const minHeight = 50;

export class RpbRow extends React.Component<RpbRowProps> {
  private refEl = React.createRef<HTMLDivElement>();
  private startY: number = 0;
  private currentHeight: number = 0;

  private onResize: (id: string, height: number) => void = () => undefined;

  state: RpbRowState = {
    draggable: false,
    config: { height: minHeight } as PageBuilderRow
  };

  constructor(props: RpbRowProps) {
    super(props);
    if (this.props.config) {
      this.state = {
        config: this.props.config
      };
    }
  }

  componentWillReceiveProps(newProps: RpbRowProps) {
    const { config = { height: minHeight } } = newProps;
    this.setState({ ...this.state, config });
  }

  /**
   * Row resize handlers
   */
  startResize = (evt: React.MouseEvent) => {
    this.startY = evt.clientY;
    const { height = minHeight } = this.state.config;
    const { offsetHeight } = this.refEl.current!;
    this.currentHeight = height < offsetHeight ? offsetHeight : height;
    document.addEventListener("mousemove", this.resize, { capture: true });
    document.addEventListener("mouseup", this.endResize);
  };
  resize = (evt: MouseEvent) => {
    const newY = evt.clientY;
    const diff = newY - this.startY;
    this.startY = newY;

    const { config } = this.state;
    this.currentHeight += diff;
    const height = this.currentHeight < minHeight ? minHeight : this.currentHeight;
    this.setState({
      ...this.state,
      config: { ...config, height }
    });
    evt.preventDefault();
  };
  endResize = () => {
    document.removeEventListener("mousemove", this.resize, { capture: true });
    document.removeEventListener("mouseup", this.endResize);

    const { config } = this.state;
    if (this.onResize) {
      this.onResize(config.id, config.height!);
    }
  };

  enableDrag = (draggable: boolean) => {
    this.setState({ ...this.state, draggable });
  };

  render() {
    const { config, draggable } = this.state;

    const style: { height: any; minHeight: any } = { height: "unset", minHeight: 50 };
    style[config.autoHeight ? "minHeight" : "height"] = config.height || 50;

    return (
      <RpbContextConsumer>
        {({ onRowResize, removeObject, editing, setDragNode }) => {
          this.onResize = onRowResize;
          return (
            <div className="rpb-row"
                 draggable={draggable}
                 onDragStart={e => {
                   setDragNode({
                     type: config.type,
                     move: config.id
                   });
                   e.stopPropagation();
                   return false;
                 }}>
              <RpbActions onDelete={() => removeObject(config.id)}
                          canMove={editing}
                          enableDrag={this.enableDrag} />
              <span className="rpb-row__overlay">
                {[...Array(12)].map((_, i) => (
                  <div key={i} />
                ))}
              </span>
              <span className="rpb-resize-handle" onMouseDown={this.startResize} />

              <div
                className="rpb-row__container"
                ref={this.refEl}
                data-id={config.id}
                style={style}
              >
                {config.content &&
                  config.content.map((config, i) => <RpbCol key={i} config={config} />)}

                {!(config.content && config.content.length) && (
                  <span className="rpb-empty">Empty Row</span>
                )}
              </div>
            </div>
          );
        }}
      </RpbContextConsumer>
    );
  }
}
