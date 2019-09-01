import React from "react";
import { PageBuilderRow } from "../page-builder";
interface RpbRowProps {
    config?: PageBuilderRow;
}
interface RpbRowState {
    draggable?: boolean;
    config: PageBuilderRow;
}
export declare class RpbRow extends React.Component<RpbRowProps> {
    private refEl;
    private startY;
    private currentHeight;
    private onResize;
    state: RpbRowState;
    constructor(props: RpbRowProps);
    componentWillReceiveProps(newProps: RpbRowProps): void;
    /**
     * Row resize handlers
     */
    startResize: (evt: React.MouseEvent<Element, MouseEvent>) => void;
    resize: (evt: MouseEvent) => void;
    endResize: () => void;
    enableDrag: (draggable: boolean) => void;
    render(): JSX.Element;
}
export {};
