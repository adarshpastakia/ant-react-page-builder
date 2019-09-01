import React from "react";
import { LayoutObject, PageBuildDragObject, PageBuilderObjectBase, PageBuilderRow, PageBuilderTile, PageBuilderWidget } from "../page-builder";
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
declare type PageBuilderContext = PageBuilderContextState & PageBuilderContextActions;
export declare const RpbContextConsumer: React.ExoticComponent<React.ConsumerProps<PageBuilderContext>>;
export declare class RpbContextProvider extends React.Component<PageBuilderContextProps> {
    state: PageBuilderContextState;
    constructor(props: PageBuilderContextProps);
    componentWillReceiveProps(newProps: PageBuilderContextProps): void;
    onRowResize: (id: string, height: number) => void;
    onColResize: (id: string, colSpan: number) => void;
    onTileUpdate: (id: string, key: "type" | "widgetId" | "showTitle" | "closeable" | "expandable" | "background" | "id", value: any) => void;
    onHeadEdited: (id: string, text: string) => void;
    fireChange(layout: LayoutObject, widgets: PageBuilderWidget<any>[]): void;
    setDragNode: (dragging: PageBuildDragObject) => void;
    findWidget: (id?: string | undefined) => PageBuilderWidget<any>;
    moveExistingNode: (parentId: string, index: number, moveId: string) => void;
    appendNewNode: (parentId: string, index: number, newObject: PageBuilderObjectBase, newWidget?: PageBuilderWidget<{}> | undefined) => void;
    removeObject: (id: string) => void;
    render(): JSX.Element;
}
export {};
