import React from "react";

import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    rootAttributesTooltip: true,
    rootAttributes: [
      {
        root: "html",
        attribute: "data-color-scheme",
        defaultState: {
          name: "Yellow",
          value: "yellow",
        },
        states: [
          {
            name: "Blue",
            value: "blue",
          },
          {
            name: "Red",
            value: "red",
          },
          {
            name: "Green",
            value: "green",
          },
        ],
      },
      {
        root: "html",
        attribute: "data-letter-spacing",
        defaultState: {
          name: "IOS",
          value: "ios",
        },
        states: [
          {
            name: "Android",
            value: "android",
          },
        ],
      },
    ],
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
