import React from "react";
import { PageBuilderHead } from "../page-builder";
interface RpbHeadProps {
    config?: PageBuilderHead;
}
export declare class RpbHead extends React.Component<RpbHeadProps> {
    state: {
        text: string;
    };
    private refEl;
    componentWillMount(): void;
    componentWillReceiveProps(newProps: RpbHeadProps): void;
    render(): JSX.Element;
}
export {};
