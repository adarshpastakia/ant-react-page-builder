import React from "react";
import { PageBuilderRow, PageBuilderHead } from "../page-builder";
import { RpbActions } from "./Actions";
import { RpbCol } from "./Col";
import { RpbContextConsumer } from "./Context";

interface RpbHeadProps {
  config?: PageBuilderHead;
}

export class RpbHead extends React.Component<RpbHeadProps> {
  public state = { text: "" };
  private refEl = React.createRef<HTMLDivElement>();

  componentWillMount() {
    this.setState({ text: this.props.config ? this.props.config.text || "" : "" });
  }

  componentWillReceiveProps(newProps: RpbHeadProps) {
    this.setState({ text: newProps.config ? newProps.config.text || "" : "" });
  }

  render() {
    const { config = { id: "", text: "" } } = this.props;
    return (
      <RpbContextConsumer>
        {({ removeObject, editing, onHeadEdited }) => {
          const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
            const input = e.target as HTMLInputElement;
            if (e.keyCode === 13) {
              onHeadEdited(config.id, this.state.text);
              input.blur();
            }
          };
          return (
            <div className="rpb-head">
              <RpbActions onDelete={() => removeObject(config.id)} />
              <div className="rpb-head_container" ref={this.refEl} data-id={config.id}>
                {editing && (
                  <input
                    value={this.state.text}
                    placeholder="Click to edit heading"
                    onFocus={e => e.target.select()}
                    onChange={e => this.setState({ text: e.target.value })}
                    onKeyUp={onKeyPress}
                  />
                )}
                {!editing && <span>{config.text}</span>}
              </div>
            </div>
          );
        }}
      </RpbContextConsumer>
    );
  }
}
