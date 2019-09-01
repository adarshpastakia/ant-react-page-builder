import React from "react";
import { PageBuilderTile } from "../page-builder";
import { RpbActions } from "./Actions";
import { RpbContextConsumer } from "./Context";

interface RpbTileProps {
  config: PageBuilderTile;
}
export class RpbTile extends React.Component<RpbTileProps> {
  state = {
    expanded: false,
    draggable: false,
    config: { background: true, expandable: false } as PageBuilderTile
  };

  onToggleExpand = () => this.setState({ expanded: !this.state.expanded });

  constructor(props: RpbTileProps) {
    super(props);
    if (this.props.config) {
      this.state = {
        expanded: false,
        draggable: false,
        config: this.props.config
      };
    }
  }

  componentWillReceiveProps(newProps: RpbTileProps) {
    const { config = { background: true, expandable: false } } = newProps;
    this.setState({ ...this.state, config });
  }

  enableDrag = (draggable: boolean) => {
    this.setState({ ...this.state, draggable });
  };

  render() {
    const { id } = this.props.config;
    const { expanded, config, draggable } = this.state;

    const classes = ["lib-tile"];
    if (expanded) classes.push("lib-tile--expanded");
    const contentClasses = ["lib-tile__content"];
    if (config.background !== false) contentClasses.push("lib-tile--background");
    return (
      <RpbContextConsumer>
        {({
          removeObject,
          findWidget,
          editing,
          renderer,
          iconRenderer,
          titleRenderer,
          actionRenderer,
          onTileUpdate,
          setDragNode
        }) => {
          const widget = findWidget(config.widgetId);

          const innerActionRenderer = () => actionRenderer && actionRenderer(widget);

          return (
            <div
              draggable={draggable}
              onDragStart={e => {
                setDragNode({
                  type: config.type,
                  move: config.id
                });
                e.stopPropagation();
                return false;
              }}
              className={classes.join(" ")}
              data-show-title={editing ? false : config.showTitle}
              data-id={config.widgetId}
            >
              {!editing && (
                <div className="rpb-tile__title">
                  {titleRenderer ? titleRenderer(widget) : widget.title}
                </div>
              )}
              <div className={contentClasses.join(" ")}>
                {!editing && renderer ? renderer(widget.config) : null}
                {editing && (
                  <div className="rpb-tile__placeholder">
                    <div className="rpb-tile__placeholder--icon">
                      {iconRenderer ? iconRenderer(widget) : widget.icon}
                    </div>
                    <div>{titleRenderer ? titleRenderer(widget) : widget.title}</div>
                    <p>Click to Edit</p>
                  </div>
                )}
              </div>

              <RpbActions
                isExpanded={expanded}
                hasSettings={editing}
                canMove={editing}
                canExpand={!editing && !!config.expandable}
                canDelete={editing || !!config.closeable}
                onToggleExpand={this.onToggleExpand}
                enableDrag={this.enableDrag}
                onDelete={() => removeObject(config.id)}
                actionRenderer={!!actionRenderer && !editing ? innerActionRenderer : undefined}
              >
                {editing && (
                  <>
                    <div>
                      <ul>
                        <label>Expandable</label>
                        <li
                          onClick={() => onTileUpdate(id, "expandable", true)}
                          className={config.expandable ? "active" : ""}
                        >
                          Yes
                        </li>
                        <li
                          onClick={() => onTileUpdate(id, "expandable", false)}
                          className={!config.expandable ? "active" : ""}
                        >
                          No
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <label>Background</label>
                        <li
                          onClick={() => onTileUpdate(id, "background", true)}
                          className={config.background ? "active" : ""}
                        >
                          Fill
                        </li>
                        <li
                          onClick={() => onTileUpdate(id, "background", false)}
                          className={!config.background ? "active" : ""}
                        >
                          None
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </RpbActions>
            </div>
          );
        }}
      </RpbContextConsumer>
    );
  }
}
