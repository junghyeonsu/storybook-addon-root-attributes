/* eslint-disable react-hooks/rules-of-hooks */
import { addons, makeDecorator, useEffect } from "@storybook/preview-api";

import { EVENTS } from "./constants";
import type { RootAttribute } from "./types";

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

const updateRootAttribute = ({
  root = "html",
  attribute,
  clickedValue,
}: UpdateRootAttributeParams) => {
  const element = getElement(root);
  element.removeAttribute(attribute);
  element.setAttribute(attribute, clickedValue);
};

const resetRootAttribute = ({
  root = "html",
  attribute,
}: Omit<UpdateRootAttributeParams, "clickedValue">) => {
  const element = getElement(root);
  element.removeAttribute(attribute);
};

export const withRootAttributes = makeDecorator({
  name: "withRootAttributes",
  parameterName: "rootAttributes",
  wrapper: (getStory, context, { parameters }) => {
    const rootAttributes = parameters?.rootAttributes;

    useEffect(() => {
      if (rootAttributes) {
        rootAttributes.forEach(
          ({ root, attribute, defaultState }: RootAttribute) =>
            updateRootAttribute({
              root,
              attribute,
              clickedValue: defaultState.value,
            }),
        );
      }
      return () => {
        if (rootAttributes) {
          rootAttributes.forEach(({ root, attribute }: RootAttribute) =>
            resetRootAttribute({ root, attribute }),
          );
        }
      };
    }, [rootAttributes]);

    addons.getChannel().on(EVENTS.UPDATE, updateRootAttribute);

    return getStory(context);
  },
});
