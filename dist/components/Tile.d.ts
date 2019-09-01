import React from "react";
import { PageBuilderTile } from "../page-builder";
interface RpbTileProps {
    config: PageBuilderTile;
}
export declare class RpbTile extends React.Component<RpbTileProps> {
    state: {
        expanded: boolean;
        draggable: boolean;
        config: PageBuilderTile;
    };
    onToggleExpand: () => void;
    constructor(props: RpbTileProps);
    componentWillReceiveProps(newProps: RpbTileProps): void;
    enableDrag: (draggable: boolean) => void;
    render(): JSX.Element;
}
export {};
