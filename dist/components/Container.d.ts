import React from "react";
import { PageBuilderRow, PageBuilderWidget } from "../page-builder";
interface RpbContainerProps {
    minRowHeight?: number;
    onEdit?: (id: string) => void;
    onScroll?: () => void;
    onAddNew?: () => Promise<PageBuilderWidget | undefined>;
}
export declare class RpbContainer extends React.Component<RpbContainerProps> {
    private refEl;
    addNewTileToColumn: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, appendNewObject: (parentId: string, index: number, newObject: PageBuilderRow, newWidget?: PageBuilderWidget<{}> | undefined) => void) => void;
    addNewColumnToRow: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, appendNewObject: (parentId: string, index: number, newObject: PageBuilderRow, newWidget?: PageBuilderWidget<{}> | undefined) => void) => void;
    render(): JSX.Element;
}
export {};
