import React from "react";
import { PageBuilderWidget, LayoutObject } from "./page-builder";
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
export declare class PageBuilder extends React.Component<PageBuilderProps> {
    state: {
        query: string;
    };
    addNewTileToColumn: () => Promise<any>;
    render(): JSX.Element;
}
export {};
