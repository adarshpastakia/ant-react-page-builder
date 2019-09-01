# React Page Builder

### Drag-n-Drop page builder for creating dynamic dashboard layouts.

---

### Install

```shell
npm install ant-react-page-builder
```

---

### Known Issues

- Minimum dimension for tile and columns not supported
- Wrapping of column on non-wide displays not supported

---

### Basic Usage

- Widget List

```ts
const widgets = [
  {
    id: "0",
    title: "My Tile",
    icon: <i className="mdi-icon" />,
    config: {
      // widget config passed to renderer
    }
  }
];
```

- Config

```ts
const config = [
    {
        id: "row1",
        type: PageBuilderTypes.ROW,
        height: 100,
        autoHeight: true | false,
        content: [
        {
            id: "col1",
            type: PageBuilderTypes.COL,
            colSpan: 6, // 1 - 12
            content: [
            {
                id: "tile1",
                type: PageBuilderTypes.TILE,
                widgetId: "0",
                closeable: true | false,
                expandable: true | false,
                background: "fill" | "none"
            }
            ]
        }
    }
]
```

- Tile Renderer

```tsx
export const TileComponent: React.FC = ({ config }) => (
  <div>
    <!-- -->
  </div>
);
```

- Main View

```tsx
export class Page extends Component {
  state = { config, editing: true };

  onChange = (config: PageBuilderRow[]) => {
    this.setState({ ...this.state, config });
  };

  render() {
    const { config, editing } = this.state;
    return (
      <PageBuilder
        allowEdit
        editing={editing}
        config={config}
        widgets={widgets}
        renderer={config => <TileComponent config={config} />}
        onChange={this.onChange}
      />
    );
  }
}
```
