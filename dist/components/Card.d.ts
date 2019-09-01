import React from "react";
import { PageBuilderTypes, PageBuilderWidget } from "../page-builder";
interface RpbCardProps {
    type: PageBuilderTypes;
    widget?: PageBuilderWidget<any>;
    icon?: string | JSX.Element;
}
export declare class RpbCard extends React.Component<RpbCardProps> {
    render(): JSX.Element;
}
export {};
