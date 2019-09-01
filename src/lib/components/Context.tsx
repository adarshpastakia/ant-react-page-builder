import React, { createContext } from "react";
import {
  LayoutObject,
  PageBuildDragObject,
  PageBuilderObjectBase,
  PageBuilderRow,
  PageBuilderTile,
  PageBuilderTypes,
  PageBuilderWidget
} from "../page-builder";
import { Logger } from "../utils/logger";

interface PageBuilderContextProps {
  editing?: boolean;
  layout: LayoutObject;
  widgets: PageBuilderWidget<any>[];
  widgetList?: PageBuilderWidget<any>[];
  onChange?: (layout: LayoutObject, widget: PageBuilderWidget<any>[]) => void;
  renderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  iconRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  titleRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  actionRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
}

interface PageBuilderContextState {
  editing: boolean;
  layout: LayoutObject;
  widgets: PageBuilderWidget<any>[];
  dragging?: PageBuildDragObject;
}

interface PageBuilderContextActions {
  onRowResize: (id: string, height: number) => void;
  onColResize: (id: string, colSpan: number) => void;
  onHeadEdited: (id: string, text: string) => void;
  onTileUpdate: (id: string, key: keyof PageBuilderTile, value: any) => void;
  setDragNode: (dragging: PageBuildDragObject) => void;
  appendNewNode: (parentId: string, index: number, newObject: PageBuilderRow) => void;
  moveExistingNode: (parentId: string, index: number, moveId: string) => void;
  removeObject: (id: string) => void;
  findWidget: (id?: string) => PageBuilderWidget<any>;
  renderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  iconRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  titleRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
  actionRenderer?: (widget: PageBuilderWidget<any>) => JSX.Element;
}

type PageBuilderContext = PageBuilderContextState & PageBuilderContextActions;

const RpbContext = createContext<PageBuilderContext>({} as PageBuilderContext);

export const RpbContextConsumer = RpbContext.Consumer;

export class RpbContextProvider extends React.Component<PageBuilderContextProps> {
  state: PageBuilderContextState;

  constructor(props: PageBuilderContextProps) {
    super(props);
    this.state = {
      dragging: undefined,
      editing: !!this.props.editing,
      layout: [...this.props.layout],
      widgets: [...this.props.widgets]
    };
  }

  componentWillReceiveProps(newProps: PageBuilderContextProps) {
    let newState = { ...this.state };
    if (this.props.layout !== newProps.layout) {
      newState = { ...newState, layout: [...newProps.layout] };
    }
    if (this.props.widgets !== newProps.widgets) {
      newState = { ...newState, widgets: [...newProps.widgets] };
    }
    if (this.props.editing !== newProps.editing) {
      newState = { ...newState, editing: !!newProps.editing };
    }
    this.setState(newState);
  }

  onRowResize = (id: string, height: number) => {
    const { layout, widgets } = this.state;
    let parent = findNode(layout, id);
    if (parent) {
      parent.height = height;
    }
    this.fireChange(layout, widgets);
  };

  onColResize = (id: string, colSpan: number) => {
    const { layout, widgets } = this.state;
    let parent = findNode(layout, id);
    if (parent) {
      parent.colSpan = colSpan;
    }
    this.fireChange(layout, widgets);
  };

  onTileUpdate = (id: string, key: keyof PageBuilderTile, value: any) => {
    const { layout, widgets } = this.state;
    let parent = findNode(layout, id);
    if (parent) {
      parent[key] = value;
    }
    this.fireChange(layout, widgets);
  };

  onHeadEdited = (id: string, text: string) => {
    const { layout, widgets } = this.state;
    let parent = findNode(layout, id);
    if (parent) {
      parent.text = text;
    }
    this.fireChange(layout, widgets);
  };

  fireChange(layout: LayoutObject, widgets: PageBuilderWidget<any>[]) {
    Logger.info("Layout Changed", layout);
    Logger.info("Widgets Changed", widgets);
    this.setState({ ...this.state, layout, widgets });
    if (this.props.onChange) {
      this.props.onChange(layout, widgets);
    }
  }

  setDragNode = (dragging: PageBuildDragObject) => {
    this.setState({ ...this.state, dragging });
  };

  findWidget = (id?: string): PageBuilderWidget<any> => {
    let widget = this.state.widgets ? this.state.widgets.find(w => w.id === id) : null;
    widget =
      widget || (this.props.widgetList ? this.props.widgetList.find(w => w.id === id) : null);
    return widget ? widget : ({} as PageBuilderWidget<any>);
  };

  moveExistingNode = (parentId: string,
                      index: number,
                      moveId: string) => {
    const { layout, widgets } = this.state;

    const newObject = { ...findNode(layout, moveId) };
    const newLayout = removeObject(layout, moveId);

    if (newObject) {
      if (parentId) {
        const parent = findNode(newLayout, parentId);
        if (parent) {
          if (!parent.content) parent.content = [];
          if (index > -1) parent.content.splice(index, 0, newObject);
          else parent.content.push(newObject);
        }
      } else {
        newLayout.splice(index, 0, newObject as PageBuilderRow);
      }
      this.fireChange(newLayout, widgets);
    }
  };

  appendNewNode = (
    parentId: string,
    index: number,
    newObject: PageBuilderObjectBase,
    newWidget?: PageBuilderWidget
  ) => {
    const { layout, widgets } = this.state;

    if (parentId) {
      const parent = findNode(layout, parentId);
      if (parent) {
        if (!parent.content) parent.content = [];
        if (index > -1) parent.content.splice(index, 0, newObject);
        else parent.content.push(newObject);
      }
    } else {
      layout.splice(index, 0, newObject as PageBuilderRow);
    }

    if (newWidget) {
      widgets.push(newWidget);
    } else if (newObject.type === PageBuilderTypes.TILE) {
      const widget = this.findWidget((newObject as PageBuilderTile).widgetId);
      if (!widgets.includes(widget)) {
        widgets.push(widget);
      }
    }
    this.fireChange(layout, widgets);
  };

  removeObject = (id: string) => {
    const { layout, widgets } = this.state;
    Logger.info("Current Layout", layout);
    const newConfig = removeObject(layout, id);
    const newWidgets = getWidgets(newConfig, widgets);
    Logger.info("New Layout", newConfig);
    this.fireChange(newConfig, newWidgets);
  };

  render() {
    const initialContext = {
      onRowResize: this.onRowResize,
      onColResize: this.onColResize,
      onHeadEdited: this.onHeadEdited,
      onTileUpdate: this.onTileUpdate,
      setDragNode: this.setDragNode,
      appendNewNode: this.appendNewNode,
      removeObject: this.removeObject,
      moveExistingNode: this.moveExistingNode,
      findWidget: this.findWidget,
      renderer: this.props.renderer,
      iconRenderer: this.props.iconRenderer,
      titleRenderer: this.props.titleRenderer,
      actionRenderer: this.props.actionRenderer
    };

    return (
      <RpbContext.Provider value={{ ...this.state, ...initialContext }}>
        {this.props.children}
      </RpbContext.Provider>
    );
  }
}

const findNode = (list: any[], id: string) => {
  for (let node of list) {
    if (node.id === id) {
      return node;
    } else if (node.content) {
      const innerNode: any = findNode(node.content, id);
      if (innerNode) {
        return innerNode;
      }
    }
  }
  return null;
};

const removeObject = (list: any[], id: string): any[] => {
  return list.filter(l => {
    l.content ? (l.content = removeObject(l.content, id)) : undefined;
    return l.id !== id;
  });
};

const getWidgets = (list: any[], widgets: any[]): any[] => {
  return list.reduce<any[]>((n, l) => {
    if (l.content) n.push(...getWidgets(l.content, widgets));
    if (l.type === PageBuilderTypes.TILE) {
      const widget = widgets.find(w => w.id === l.widgetId);
      if (widget && !n.includes(widget)) n.push(widget);
    }
    return n;
  }, []);
};
