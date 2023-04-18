import {
  Div,
  H4,
  IconButton,
  Icons,
  TooltipLinkList,
  WithTooltip,
} from "@storybook/components";
import {
  useAddonState,
  useGlobals,
  useStorybookApi,
} from "@storybook/manager-api";
import React from "react";

import { EVENTS, PARAM_KEY, TOOL_ID } from "../constants";
import type { RootAttribute } from "../types";

export const Tool = () => {
  const api = useStorybookApi();
  const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
  const isTooltip = api.getCurrentParameter<boolean>("rootAttributesTooltip");
  const [isToolActive, setIsToolActive] = useAddonState<boolean>(
    "isToolActive",
    false,
  );
  const [globals, setGlobals] = useGlobals();

  if (!rootAttributes || !isTooltip) return null;
  if (!Array.isArray(rootAttributes))
    return <div>Root Attributes have to array</div>;

  const toggleMyTool = (visibility: boolean) => setIsToolActive(visibility);

  const lists = rootAttributes.map(
    ({ root, attribute, defaultState, states }) => {
      return {
        attribute,
        list: [
          {
            id: defaultState.value,
            title: defaultState.name,
            onClick: () => {
              api.emit(EVENTS.UPDATE, {
                root,
                attribute,
                clickedValue: defaultState.value,
              });
              setGlobals({
                [PARAM_KEY]: {
                  ...globals[PARAM_KEY],
                  [attribute]: defaultState.value,
                },
              });
            },
            right: null,
            active:
              !globals[PARAM_KEY][attribute] ||
              globals[PARAM_KEY][attribute] === defaultState.value,
          },
          ...states.map((state) => ({
            id: state.value,
            title: state.name,
            onClick: () => {
              api.emit(EVENTS.UPDATE, {
                root,
                attribute,
                clickedValue: state.value,
              });
              setGlobals({
                [PARAM_KEY]: {
                  ...globals[PARAM_KEY],
                  [attribute]: state.value,
                },
              });
            },
            right: null,
            active: globals[PARAM_KEY][attribute] === state.value,
          })),
        ],
      };
    },
  );

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      key={TOOL_ID}
      tooltipShown={isToolActive}
      onVisibilityChange={toggleMyTool}
      tooltip={lists.map(({ attribute, list }) => (
        <Div key={attribute}>
          <Div style={{ padding: "20px 15px 5px 15px" }}>
            <H4>{attribute}</H4>
          </Div>
          <TooltipLinkList links={list} />
        </Div>
      ))}
      closeOnClick={true}
    >
      <IconButton
        key="root-attribute"
        active={isToolActive}
        title="Root Attributes"
      >
        <Icons icon="cog" />
      </IconButton>
    </WithTooltip>
  );
};
