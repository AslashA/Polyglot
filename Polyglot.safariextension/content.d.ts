/// <reference types="safari-extension-content" />
declare let settings: Settings;
declare let isPanelOpen: boolean;
declare const PANEL_ID = "polyglot__panel";
declare function handleMessage(msg: SafariExtensionMessageEvent): void;
declare function handleMouseUp(e: MouseEvent): void;
declare function handleKeypress(e: KeyboardEvent): void;
declare function getSelectedText(): void;
declare function removePanel(): void;
declare function showPanel(content: string): boolean;
declare function updatePanel(content: string): void;
declare function getSelectionBoundingRect(): BoundingBox;
declare function isDescendant(parent: Element, child: Element): boolean;
