import React from "react";
import { RpbCard } from "./components/Card";
import { RpbContainer } from "./components/Container";
import { RpbContextProvider } from "./components/Context";
import { PageBuilderRow, PageBuilderTypes, PageBuilderWidget, LayoutObject } from "./page-builder";

interface PageBuilderProps {
  layout: LayoutObject;
  widgets: PageBuilderWidget<any>[];
  widgetList?: PageBuilderWidget<any>[];
  editing?: boolean;
  allowEdit?: boolean;
  showTiles?: boolean;
  minRowHeight?: number;
  renderer: (config: any) => JSX.Element;
  onAddNew?: () => Promise<PageBuilderWidget> | string | void;
  onEdit?: (id: string) => void;
  onScroll?: () => void;
  onChange?: (layout: LayoutObject, widgets: PageBuilderWidget<any>[]) => void;
  iconRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  titleRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  actionRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
}

export class PageBuilder extends React.Component<PageBuilderProps> {
  state = { query: "" };
  addNewTileToColumn = () => {
    return new Promise<any | undefined>(resolve => {
      if (this.props.onAddNew) {
        const result = this.props.onAddNew();
        if (result instanceof Promise) {
          result.then(widget => {
            resolve(widget);
          });
        } else if (result) {
          resolve(result);
        }
      } else {
        resolve();
      }
    });
  };

  render() {
    const {
      layout,
      editing,
      widgets = [],
      onEdit,
      showTiles,
      onScroll,
      widgetList = [],
      minRowHeight = 120
    } = this.props;
    const { query } = this.state;

    const newList =
      showTiles &&
      widgets &&
      widgetList &&
      widgetList.filter(w => !widgets.find(wl => w.id === wl.id));
    return (
      <RpbContextProvider {...this.props}>
        <div className="react-page-builder" data-editing={editing}>
          <RpbContainer
            onAddNew={this.addNewTileToColumn}
            onEdit={onEdit}
            onScroll={onScroll}
            minRowHeight={minRowHeight}
          />
          {editing && (
            <div className="rpb-aside">
              <div className="rpb-aside__fixed">
                <div className="rpb-aside__internal">
                  <RpbCard type={PageBuilderTypes.ROW} icon={<div className="rpb-row-icon" />} />
                  <RpbCard type={PageBuilderTypes.COL} icon={<div className="rpb-col-icon" />} />
                  <RpbCard type={PageBuilderTypes.HEAD} icon={<div className="rpb-head-icon" />} />
                </div>
                {newList && !!newList.length && (
                  <div>
                    <input
                      placeholder="Filter tiles..."
                      className="rpb-query--input"
                      value={this.state.query}
                      onChange={e => this.setState({ query: (e.target as HTMLInputElement).value })}
                    />
                  </div>
                )}
              </div>
              <div className="rpb-aside__content">
                {newList && !!newList.length && (
                  <>
                    {newList
                      .filter(w => !query || `${w.title}`.includes(query))
                      .map(widget => (
                        <RpbCard key={widget.id} widget={widget} type={PageBuilderTypes.TILE}>
                          {widget.title}
                        </RpbCard>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </RpbContextProvider>
    );
  }
}
