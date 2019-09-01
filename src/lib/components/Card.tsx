import React from "react";
import { PageBuilderTypes, PageBuilderWidget } from "../page-builder";
import { RpbContextConsumer } from "./Context";

interface RpbCardProps {
  type: PageBuilderTypes;
  widget?: PageBuilderWidget<any>;
  icon?: string | JSX.Element;
}
export class RpbCard extends React.Component<RpbCardProps> {
  render() {
    const { type, widget, icon, children } = this.props;
    return (
      <RpbContextConsumer>
        {({ setDragNode: setDragObject, iconRenderer }) => {
          return (
            <div
              draggable
              className="rpb-card"
              onDragStart={() => setDragObject({ type, widgetId: widget && widget.id })}
            >
              <div className="rpb-card__icon">
                {widget ? (iconRenderer ? iconRenderer(widget) : widget.icon) : icon}
              </div>
              <div className="rpb-card__title">{children}</div>
            </div>
          );
        }}
      </RpbContextConsumer>
    );
  }
}
