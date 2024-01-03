import { AddonPanel, Button, Div, H2 } from "@storybook/components";
import { useGlobals, useStorybookApi } from "@storybook/manager-api";
import React from "react";

import { EVENTS, PARAM_KEY, WRONG_PARAM_KEY } from "../constants";
import type { RootAttribute } from "../types";

interface PanelProps {
  active: boolean;
  key: string;
}

export const Panel = (props: PanelProps) => {
  const api = useStorybookApi();
  const wrongRootAttribute = api.getCurrentParameter<RootAttribute[]>(WRONG_PARAM_KEY);
  const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
  const [globals, setGlobals] = useGlobals();

  if (wrongRootAttribute) {
    return (
      <AddonPanel {...props}>
        Please change {WRONG_PARAM_KEY} to {PARAM_KEY}
      </AddonPanel>
    );
  }

  if (!rootAttributes) {
    return <AddonPanel {...props}>Please input {PARAM_KEY}</AddonPanel>;
  }

  if (!Array.isArray(rootAttributes)) {
    return <AddonPanel {...props}>Please input {PARAM_KEY} to array</AddonPanel>;
  }

  return (
    <AddonPanel {...props}>
      {rootAttributes.map((rootAttribute: RootAttribute) => {
        const { root, attribute, defaultState, states } = rootAttribute;

        const isDefaultPrimary = !globals[PARAM_KEY][attribute] || globals[PARAM_KEY][attribute] === defaultState.value;

        return (
          <Div style={{ padding: "20px" }} key={attribute}>
            <H2>{attribute}</H2>
            <Div style={{ display: "flex", columnGap: "10px" }}>
              <Button
                primary={isDefaultPrimary}
                gray={!isDefaultPrimary}
                onClick={() => {
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
                }}
              >
                {defaultState.name}
              </Button>
              {states.map((state) => (
                <Button
                  key={state.name}
                  primary={globals[PARAM_KEY][attribute] === state.value}
                  gray={globals[PARAM_KEY][attribute] !== state.value}
                  onClick={() => {
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
                  }}
                >
                  {state.name}
                </Button>
              ))}
            </Div>
          </Div>
        );
      })}
    </AddonPanel>
  );
};
