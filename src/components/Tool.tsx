import { Div, H4, IconButton, Icons, TooltipLinkList, WithTooltip } from "@storybook/components";
import { useGlobals, useStorybookApi } from "@storybook/manager-api";
import React, { useState } from "react";

import { EVENTS, PARAM_KEY, TOOL_ID } from "../constants";
import type { RootAttribute } from "../types";

export const Tool = () => {
  const api = useStorybookApi();
  const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
  const isTooltip = api.getCurrentParameter<boolean>("rootAttributesTooltip");
  const [globals, setGlobals] = useGlobals();
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  if (!rootAttributes || !isTooltip) return null;
  if (!Array.isArray(rootAttributes)) return <div>Root Attributes have to array</div>;

  const toggleMyTool = (visibility: boolean) => {
    setIsTooltipActive(visibility);
  };

  const lists = rootAttributes.map(({ root, attribute, defaultState, states }) => {
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
          active: !globals[PARAM_KEY][attribute] || globals[PARAM_KEY][attribute] === defaultState.value,
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
  });

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      key={TOOL_ID}
      tooltipShown={isTooltipActive}
      onVisibleChange={(visibility) => {
        toggleMyTool(visibility);
      }}
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
      <IconButton key="root-attribute" active={isTooltipActive} title="Root Attributes">
        <Icons icon="cog" />
      </IconButton>
    </WithTooltip>
  );
};
