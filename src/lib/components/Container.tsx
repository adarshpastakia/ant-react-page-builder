import React from "react";
import { PageBuilderHead, PageBuilderRow, PageBuilderTypes, PageBuilderWidget } from "../page-builder";
import { classes, getNearest, getNodeConfig, onDragLeave, onDragOver, onDrop } from "../utils/dnd";
import { RpbContextConsumer } from "./Context";
import { RpbRow } from "./Row";
import { RpbHead } from "./Head";

interface RpbContainerProps {
  minRowHeight?: number;
  onEdit?: (id: string) => void;
  onScroll?: () => void;
  onAddNew?: () => Promise<PageBuilderWidget | undefined>;
}

export class RpbContainer extends React.Component<RpbContainerProps> {
  private refEl = React.createRef<HTMLDivElement>();

  addNewTileToColumn = (
    evt: React.MouseEvent<HTMLDivElement>,
    appendNewObject: (
      parentId: string,
      index: number,
      newObject: PageBuilderRow,
      newWidget?: PageBuilderWidget
    ) => void
  ) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains(classes.col) && this.props.onAddNew) {
      const tile = getNearest(target.firstElementChild as HTMLElement, classes.tile);
      if (!tile) {
        this.props.onAddNew().then(config => {
          if (config) {
            appendNewObject(
              target.dataset.id || "",
              0,
              getNodeConfig(
                {
                  type: PageBuilderTypes.TILE,
                  widgetId: config.id
                },
                this.props.minRowHeight
              ) as PageBuilderRow,
              config
            );
          }
        });
      }
    } else {
      const tile = getNearest(target, classes.tile);
      if (tile && this.props.onEdit) {
        this.props.onEdit(tile.dataset.id || "");
      }
    }
  };

  addNewColumnToRow = (
    evt: React.MouseEvent<HTMLDivElement>,
    appendNewObject: (
      parentId: string,
      index: number,
      newObject: PageBuilderRow,
      newWidget?: PageBuilderWidget
    ) => void
  ) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains(classes.row) && this.props.onAddNew) {
      const newcol = getNodeConfig({
        type: PageBuilderTypes.COL
      });
      appendNewObject(target.dataset.id || "", -1, newcol as PageBuilderRow);
      this.props.onAddNew().then(config => {
        if (config) {
          appendNewObject(
            newcol.id || "",
            0,
            getNodeConfig(
              {
                type: PageBuilderTypes.TILE,
                widgetId: config.id
              },
              this.props.minRowHeight
            ) as PageBuilderRow,
            config
          );
        }
      });
    }
  };

  render() {
    return (
      <RpbContextConsumer>
        {({ dragging, appendNewNode, layout, moveExistingNode }) => {
          console.log(layout);
          return(
            <div
              className="rpb-container"
              ref={this.refEl}
              onScroll={this.props.onScroll}
              onClick={e => this.addNewTileToColumn(e, appendNewNode)}
              onDoubleClick={e => this.addNewColumnToRow(e, appendNewNode)}
              onDragLeave={e => onDragLeave(e, dragging!)}
              onDragExit={e => onDragLeave(e, dragging!)}
              onDragOver={e => onDragOver(e, dragging!)}
              onDrop={e => [
                onDrop(e, dragging!, appendNewNode, moveExistingNode)
              ]}
            >
              {layout.map((config, i) =>
                config.type === PageBuilderTypes.HEAD ? (
                  <RpbHead key={i} config={config as PageBuilderHead}/>
                ) : (
                  <RpbRow key={i} config={config as PageBuilderRow}/>
                )
              )}
            </div>
          )
        }}
      </RpbContextConsumer>
    );
  }
}
