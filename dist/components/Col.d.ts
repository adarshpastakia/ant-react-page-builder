import React from "react";
import { PageBuilderCol } from "../page-builder";
interface RpbColProps {
    config?: PageBuilderCol;
}
interface RpbColState {
    draggable?: boolean;
    config: PageBuilderCol;
}
export declare class RpbCol extends React.Component<RpbColProps> {
    state: RpbColState;
    private refEl;
    private minWidth;
    constructor(props: RpbColProps);
    componentWillReceiveProps(newProps: RpbColProps): void;
    /**
     * Column resize handlers
     */
    startResize: () => void;
    resize: (evt: MouseEvent) => void;
    endResize: () => void;
    enableDrag: (draggable: boolean) => void;
    render(): JSX.Element;
    private onResize;
}
export {};
