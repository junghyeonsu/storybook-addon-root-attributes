import { addons, types } from "@storybook/manager-api";

import { Panel } from "./components/Panel";
import { Tool } from "./components/Tool";
import { ADDON_ID, APP_TITLE, PANEL_ID, TOOL_ID } from "./constants";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: APP_TITLE,
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: Tool,
  });

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: APP_TITLE,
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });

  // Register the tab
  // addons.add(TAB_ID, {
  // 	type: types.TAB,
  // 	title: APP_TITLE,
  // 	//👇 Checks the current route for the story
  // 	route: ({ storyId }) => `/myaddon/${storyId}`,
  // 	//👇 Shows the Tab UI element in myaddon view mode
  // 	match: ({ viewMode }) => viewMode === 'myaddon',
  // 	render: Tab,
  // });
});
