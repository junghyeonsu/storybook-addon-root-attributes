/* eslint-disable react-hooks/rules-of-hooks */
import { addons, makeDecorator, useEffect, useGlobals } from "@storybook/preview-api";

import type { RootAttribute } from ".";
import { EVENTS, PARAM_KEY } from "./constants";

interface UpdateRootAttributeParams {
  root: string;
  attribute: string;
  clickedValue: string;
}

const getElement = (root: string) => {
  if (root === "body") return document.body;
  if (root === "html") return document.documentElement;
  return document.querySelector(root) || document.documentElement;
};

const updateRootAttribute = ({ root = "html", attribute, clickedValue }: UpdateRootAttributeParams) => {
  const element = getElement(root);
  element.removeAttribute(attribute);
  element.setAttribute(attribute, clickedValue);
};

const resetRootAttribute = ({ root = "html", attribute }: Omit<UpdateRootAttributeParams, "clickedValue">) => {
  const element = getElement(root);
  element.removeAttribute(attribute);
};

export const withRootAttributes = makeDecorator({
  name: "withRootAttributes",
  parameterName: "rootAttributes",
  wrapper: (getStory, context, { parameters }) => {
    const [globals] = useGlobals();

    const rootAttributes = parameters;
    const globalRootAttributes = globals[PARAM_KEY];

    useEffect(() => {
      if (rootAttributes) {
        rootAttributes.forEach(({ root, attribute, defaultState }: RootAttribute) =>
          updateRootAttribute({
            root,
            attribute,
            clickedValue: globalRootAttributes[attribute] || defaultState.value,
          }),
        );
      }
      return () => {
        if (rootAttributes) {
          rootAttributes.forEach(({ root, attribute }: RootAttribute) => resetRootAttribute({ root, attribute }));
        }
      };
    }, [globalRootAttributes, rootAttributes]);

    addons.getChannel().on(EVENTS.UPDATE, updateRootAttribute);

    return getStory(context);
  },
});
