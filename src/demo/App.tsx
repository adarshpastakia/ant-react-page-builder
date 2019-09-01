import React, { Component } from "react";
import { LayoutObject, PageBuilder, PageBuilderRow, PageBuilderTypes, PageBuilderWidget } from "../lib";
import "./app.less";
import { TileComponent } from "./TileComponent";

const widgetList = [
  {
    id: "0",
    title: "My Tile",
    icon: "test"
  }
];
const layout: PageBuilderRow[] = [
  {
    id: "row1",
    type: PageBuilderTypes.ROW,
    height: 100,
    content: [
      {
        id: "col1",
        type: PageBuilderTypes.COL,
        colSpan: 2,
        content: [
          {
            id: "tile1",
            type: PageBuilderTypes.TILE,
            widgetId: "0",
            background: true
          }
        ]
      },
      {
        id: "col2",
        type: PageBuilderTypes.COL,
        colSpan: 4,
        content: [
          {
            id: "tile1",
            type: PageBuilderTypes.TILE,
            widgetId: "0",
            background: true
          }
        ]
      },
      {
        id: "col3",
        type: PageBuilderTypes.COL,
        colSpan: 2,
        content: [
          {
            id: "tile1",
            type: PageBuilderTypes.TILE,
            widgetId: "0",
            background: true
          }
        ]
      }
    ]
  },
  {
    id: "row2",
    type: PageBuilderTypes.ROW,
    height: 416,
    autoHeight: true,
    content: [
      {
        id: "col4",
        type: PageBuilderTypes.COL,
        colSpan: 4,
        content: [
          {
            id: "row9",
            type: PageBuilderTypes.ROW,
            height: 200,
            content: [
              {
                id: "col18",
                type: PageBuilderTypes.COL,
                colSpan: 6,
                content: [
                  {
                    id: "tile1",
                    type: PageBuilderTypes.TILE,
                    widgetId: "0",
                    background: true,
                    showTitle: "hover"
                  }
                ]
              },
              {
                id: "col88",
                type: PageBuilderTypes.COL,
                colSpan: 6,
                content: [
                  {
                    id: "tile1",
                    type: PageBuilderTypes.TILE,
                    widgetId: "0",
                    background: true,
                    showTitle: "hover"
                  }
                ]
              }
            ]
          },
          {
            id: "row29",
            type: PageBuilderTypes.ROW,
            height: 200,
            content: [
              {
                id: "col128",
                type: PageBuilderTypes.COL,
                colSpan: 6,
                content: [
                  {
                    id: "tile1",
                    type: PageBuilderTypes.TILE,
                    widgetId: "0",
                    background: true,
                    showTitle: "hover"
                  }
                ]
              },
              {
                id: "col884",
                type: PageBuilderTypes.COL,
                colSpan: 6,
                content: [
                  {
                    id: "tile1",
                    type: PageBuilderTypes.TILE,
                    widgetId: "0",
                    background: true,
                    showTitle: "hover"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "col5",
        type: PageBuilderTypes.COL,
        colSpan: 8,
        content: [
          {
            id: "tile1",
            type: PageBuilderTypes.TILE,
            widgetId: "0",
            background: true,
            showTitle: "always",
            expandable: true
          }
        ]
      }
    ]
  }
];

class App extends Component {
  state = { layout, widgets: [...widgetList], editing: true };

  onChange = (layout: LayoutObject, widgets: PageBuilderWidget<any>[]) => {
    console.log(layout, widgets);
    this.setState({ ...this.state, layout, widgets });
  };

  onAddNew = () => {
    return new Promise<any>(r => {
      const id = `${Math.floor(Math.random() * 99)}`;
      setTimeout(() => {
        r({
          id,
          title: `New Tile - ${id}`,
          icon: "test"
        });
      }, 100);
    });
  };

  render() {
    const { layout, editing, widgets } = this.state;
    return (
      <div className="app-container">
        <div className="app-head">
          <button onClick={() => this.setState({ ...this.state, editing: !editing })}>Edit</button>
          <button onClick={() => console.log(layout, widgets)}>Spit Config</button>
        </div>
        <div className="app-content">
          <PageBuilder
            allowEdit
            showTiles
            editing={editing}
            layout={layout}
            widgets={widgets}
            widgetList={widgetList}
            actionRenderer={() => <button>Click</button>}
            renderer={widget => <TileComponent config={widget} />}
            onAddNew={this.onAddNew}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
