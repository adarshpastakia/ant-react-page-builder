export declare enum PageBuilderTypes {
    ROW = "row",
    COL = "col",
    TILE = "tile",
    HEAD = "head"
}
export interface PageBuilderObjectBase {
    id: string;
    type: PageBuilderTypes;
}
export declare type LayoutObject = Array<PageBuilderRow | PageBuilderHead>;
export interface PageBuilderRow extends PageBuilderObjectBase {
    type: PageBuilderTypes.ROW;
    height?: number;
    content?: PageBuilderCol[];
    autoHeight?: boolean;
}
export interface PageBuilderCol extends PageBuilderObjectBase {
    type: PageBuilderTypes.COL;
    colSpan?: number;
    content?: (PageBuilderRow | PageBuilderHead | PageBuilderTile)[];
}
export interface PageBuilderTile extends PageBuilderObjectBase {
    type: PageBuilderTypes.TILE;
    widgetId?: string;
    showTitle?: "always" | "hover" | false | undefined;
    closeable?: boolean;
    expandable?: boolean;
    background?: boolean;
}
export interface PageBuilderHead extends PageBuilderObjectBase {
    type: PageBuilderTypes.HEAD;
    text?: string;
}
export declare type PageBuildDragObject = {
    type: string;
    move?: string;
    widgetId?: string;
};
export interface PageBuilderWidget<T = {}> {
    id?: string;
    title?: string;
    icon?: string | JSX.Element;
    config?: T;
}
