/** @internal */
import { PageBuildDragObject, PageBuilderTypes } from "../page-builder";

let ghost: HTMLElement | undefined = undefined;
let currentParent: HTMLElement;

export enum classes {
  rowParent = "rpb-row",
  row = "rpb-row__container",
  col = "rpb-col__container",
  tile = "rpb-tile",
  head = "rpb-head",
  ghost = "rpb-ghost",
  container = "rpb-container"
}

/**
 * generate element id
 */
const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

/**
 * get config from drag object
 */
const getGhost = (type: PageBuilderTypes) => {
  const div = document.createElement("div");
  div.classList.add(classes.ghost);

  if (type === PageBuilderTypes.ROW) div.classList.add("lib-row");
  if (type === PageBuilderTypes.COL) div.classList.add("lib-col");
  if (type === PageBuilderTypes.TILE) div.classList.add("lib-tile");
  if (type === PageBuilderTypes.HEAD) div.classList.add("lib-head");

  return div;
};

const canAllowDrop = (target: HTMLElement, type: string) => {
  if (type === PageBuilderTypes.ROW || type === PageBuilderTypes.HEAD) {
    target = getNearestSiblingForRow(target);
    if (
      target.classList.contains(classes.col) &&
      target.firstElementChild &&
      target.firstElementChild!.classList.contains(classes.tile)
    ) {
      return false;
    }
    if (target.classList.contains(classes.col) && getParentRows(target).length >= 2) {
      return false;
    }
    return (
      target.classList.contains(classes.container) ||
      target.classList.contains(classes.row) ||
      target.classList.contains(classes.col) ||
      target.classList.contains(classes.tile) ||
      target.classList.contains(classes.ghost)
    );
  }
  if (type === PageBuilderTypes.COL) {
    target = getNearestSiblingForColumn(target);
    return (
      target.classList.contains(classes.row) ||
      target.classList.contains(classes.col) ||
      target.classList.contains(classes.tile) ||
      target.classList.contains(classes.ghost)
    );
  }
  if (type === PageBuilderTypes.TILE) {
    const firstChild = target.firstElementChild;
    if (target.classList.contains(classes.col) && firstChild) {
      return !(firstChild.classList.contains(classes.rowParent) || firstChild.classList.contains(classes.tile));
    }
    return target.classList.contains(classes.col) || target.classList.contains(classes.ghost);
  }
  return false;
};

/** @internal */
export const getNearest = (target: HTMLElement, className: string) => {
  while (target && !target.classList.contains(className)) {
    target = target.parentElement as HTMLElement;
  }
  return target;
};

const getParentRows = (target: HTMLElement) => {
  let row;
  const rows = [];
  while ((row = getNearest(target, classes.row))) {
    target = row.parentElement!;
    rows.push(row);
  }
  return rows;
};

const getNearestTile = (target: HTMLElement) => {
  return getNearest(target, classes.tile);
};

const getNearestSiblingForColumn = (target: HTMLElement) => {
  const tile = getNearestTile(target);
  return tile ? tile.parentElement! : target;
};

const getNearestSiblingForRow = (target: HTMLElement) => {
  const tile = getNearestTile(target);
  return tile ? getNearest(tile, classes.row) : target;
};

const calculateNewRow = (evt: React.DragEvent, ghost: HTMLElement) => {
  let currentTarget = (currentParent = getNearestSiblingForRow(evt.target as HTMLElement));
  let after = true;
  let isRow = false;
  if (currentTarget.classList.contains(classes.row)) {
    const box = currentTarget.getBoundingClientRect();
    after = box.top + box.height / 2 < evt.clientY;
    currentTarget = currentTarget.parentElement!;
    currentParent = currentTarget.parentElement!;
    isRow = true;
  }

  if (isRow && !after) {
    currentParent.insertBefore(ghost, currentTarget);
  } else if (isRow && after && currentTarget.nextElementSibling) {
    currentParent.insertBefore(ghost, currentTarget.nextElementSibling);
  } else {
    currentParent.appendChild(ghost);
  }
  evt.preventDefault();
};

const calculateNewCol = (evt: React.DragEvent, ghost: HTMLElement) => {
  let currentTarget = (currentParent = getNearestSiblingForColumn(evt.target as HTMLElement));
  let after = true;
  let isCol = false;
  if (currentTarget.classList.contains(classes.col)) {
    const box = currentTarget.getBoundingClientRect();
    after = box.left + box.width / 2 < evt.clientX;
    currentParent = getNearest(currentParent, classes.row);
    currentTarget = currentTarget.parentElement!;
    isCol = true;
  }

  if (isCol && !after) {
    currentParent.insertBefore(ghost, currentTarget);
  } else if (isCol && after && currentTarget.nextElementSibling) {
    currentParent.insertBefore(ghost, currentTarget.nextElementSibling);
  } else {
    currentParent.appendChild(ghost);
  }
  evt.preventDefault();
};

/** @internal */
export const getNodeConfig = (dragging: PageBuildDragObject, minHeight = 120) => {
  const newConfig = {
    type: dragging.type,
    id: generateId()
  };
  if (dragging.type === PageBuilderTypes.TILE)
    return {
      ...newConfig,
      expandable: true,
      background: "fill",
      widgetId: dragging.widgetId
    };
  else if (dragging.type === PageBuilderTypes.COL)
    return {
      ...newConfig,
      colSpan: 3
    };
  else if (dragging.type === PageBuilderTypes.ROW)
    return {
      ...newConfig,
      height: minHeight
    };
  else return newConfig;
};

/**
 * Element drag over
 */
/** @internal */
export const onDragOver = (evt: React.DragEvent, dragging: PageBuildDragObject) => {
  let target = evt.target as HTMLElement;
  if (target.classList.contains(classes.ghost)) {
    evt.preventDefault();
  } else if (canAllowDrop(target, dragging.type)) {
    if (!ghost) {
      ghost = getGhost(dragging.type as PageBuilderTypes);
    }
    if (dragging.type === PageBuilderTypes.ROW || dragging.type === PageBuilderTypes.HEAD) {
      calculateNewRow(evt, ghost);
    }
    if (dragging.type === PageBuilderTypes.COL) {
      calculateNewCol(evt, ghost);
    }
    if (dragging.type === PageBuilderTypes.TILE) {
      currentParent = target;
      target.appendChild(ghost);
      evt.preventDefault();
    }
  }
};

/** @internal */
export const onDragLeave = (evt: React.DragEvent, dragging: PageBuildDragObject) => {
  let target = evt.relatedTarget as HTMLElement;
  if (target && ghost && !canAllowDrop(target, dragging.type)) {
    ghost.remove();
    ghost = undefined;
  }
};

/** @internal */
export const onDrop = (
  _: React.DragEvent,
  dragging: PageBuildDragObject,
  appendNewNode: (id: string, index: number, cfg: any) => void,
  moveExistingNode: (id: string, index: number, moveId: string) => void
) => {
  // @ts-ignore
  const index = [...currentParent.children].indexOf(ghost);

  if (dragging.move) {
    moveExistingNode(currentParent.dataset.id || "", index, dragging.move);
  } else {
    appendNewNode(currentParent.dataset.id || "", index, getNodeConfig(dragging));
  }
  if (ghost) {
    ghost.remove();
    ghost = undefined;
  }
};
