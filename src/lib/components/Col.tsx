import React from "react";
import { PageBuilderCol, PageBuilderTypes } from "../page-builder";
import { getNearest } from "../utils/dnd";
import { RpbActions } from "./Actions";
import { RpbContextConsumer } from "./Context";
import { RpbRow } from "./Row";
import { RpbTile } from "./Tile";
import { RpbHead } from "./Head";

interface RpbColProps {
  config?: PageBuilderCol;
}

interface RpbColState {
  draggable?: boolean;
  config: PageBuilderCol;
}

export class RpbCol extends React.Component<RpbColProps> {
  state: RpbColState = {
    draggable: false,
    config: { colSpan: 1 } as PageBuilderCol
  };
  private refEl = React.createRef<HTMLDivElement>();
  private minWidth: number = 0;

  constructor(props: RpbColProps) {
    super(props);
    if (this.props.config) {
      this.state = {
        config: this.props.config
      };
    }
  }

  componentWillReceiveProps(newProps: RpbColProps) {
    const { config = { colSpan: 1 } } = newProps;
    this.setState({ ...this.state, config });
  }

  /**
   * Column resize handlers
   */
  startResize = () => {
    getNearest(this.refEl.current!, "lib-row").classList.add("child-resizing");
    this.minWidth = this.refEl.current!.parentElement!.parentElement!.offsetWidth / 12;
    document.addEventListener("mousemove", this.resize);
    document.addEventListener("mouseup", this.endResize);
  };

  resize = (evt: MouseEvent) => {
    const newX = evt.clientX;

    const { config } = this.state;
    const box = this.refEl.current!.getBoundingClientRect();
    let colSpan = Math.floor((newX - (box.left - this.minWidth)) / this.minWidth) || 1;
    if (colSpan > 12) colSpan = 12;
    this.setState({ ...this.state, config: { ...config, colSpan } });
  };

  endResize = () => {
    getNearest(this.refEl.current!, "lib-row").classList.remove("child-resizing");
    document.removeEventListener("mousemove", this.resize);
    document.removeEventListener("mouseup", this.endResize);

    const { config } = this.state;
    if (this.onResize) {
      this.onResize(config.id, config.colSpan!);
    }
  };

  enableDrag = (draggable: boolean) => {
    this.setState({ ...this.state, draggable });
  };

  render() {
    const { config, draggable } = this.state;
    return (
      <RpbContextConsumer>
        {({ onColResize, removeObject, setDragNode, editing }) => {
          this.onResize = onColResize;
          return (
            <div className="rpb-col" style={{ gridColumnEnd: `span ${config.colSpan}` }}
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
                          enableDrag={this.enableDrag}/>
              <span className="rpb-resize-handle" onMouseDown={this.startResize}/>

              <div
                className="rpb-col__container"
                ref={this.refEl}
                data-id={config.id}
                data-has-row={config.content && config.content.length > 1}
              >
                {config.content &&
                config.content.map((config, i) => {
                  if (config.type === PageBuilderTypes.ROW)
                    return <RpbRow key={i} config={config}/>;
                  else if (config.type === PageBuilderTypes.HEAD)
                    return <RpbHead key={i} config={config}/>;
                  else if (config.type === PageBuilderTypes.TILE)
                    return <RpbTile key={i} config={config}/>;
                  else return null;
                })}

                {!(config.content && config.content.length) && (
                  <div className="rpb-empty">
                    <p>Drag Visualization Tile</p>
                    <p className="rpb-divider">
                      <span>OR</span>
                    </p>
                    <p>Create New Visualization</p>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </RpbContextConsumer>
    );
  }

  private onResize: (id: string, colSpan: number) => void = () => undefined;
}
