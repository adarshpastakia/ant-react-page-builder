import React from "react";
export declare const RpbActions: React.FC<{
    canMove?: boolean;
    canDelete?: boolean;
    canExpand?: boolean;
    hasSettings?: boolean;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
    onDelete?: () => void;
    enableDrag?: (e: boolean) => void;
    actionRenderer?: () => JSX.Element | undefined;
}>;
