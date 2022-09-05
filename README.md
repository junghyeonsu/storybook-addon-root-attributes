# Storybook Addon Root Attributes

![demo](/assets/demo.gif)

> This project was inspired by [le0pard/storybook-addon-root-attribute](https://github.com/le0pard/storybook-addon-root-attribute)

Storybook Addon Root Attributes to switch html, body or some element attribute at runtime for your story [Storybook](https://storybook.js.org)

## [Demo](https://storybook-addon-root-attributes.vercel.app/)

## Installation

```sh
yarn add -D storybook-addon-root-attributes
```

## Configuration

create a file called `main.js` and add addon in `addons` section:

```js
module.exports = {
  ...
  addons: [
    ...
    'storybook-addon-root-attributes'
  ]
};
```

## Usage

```js
import { addParameters } from '@storybook/react';

// global
addParameters({
  rootAttribute: {
    defaultState: {
      name: 'Default',
      value: null,
    },
    states: [
      {
        name: 'Dark',
        value: 'dark',
      },
    ],
  },
});
```

You can use the `rootAttributes` parameter to override resources on each story individually:

```js
// per story: Button.stories.js
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    rootAttributes: [
      {
        root: 'html',
        attribute: 'data-color-scheme',
        defaultState: {
          name: 'Yellow',
          value: 'yellow',
        },
        states: [
          {
            name: 'Blue',
            value: 'blue',
          },
          {
            name: 'Red',
            value: 'red',
          },
          {
            name: 'Green',
            value: 'green',
          },
        ],
      },
    ],
  },
};
```

If you want to use a tooltip (panel will not dissapear), you need to set `rootAttributesTooltip` in parameters with `true` value:

```js
addParameters({
  rootAttributesTooltip: true, // you need to set this property
  rootAttributes: [
    {
      root: 'html',
      attribute: 'data-scale-color',
      defaultState: {
        name: 'Light',
        value: 'light',
      },
      states: [
        {
          name: 'Dark',
          value: 'dark',
        },
        {
          name: 'Gray',
          value: 'gray',
        },
      ],
    },
    {
      root: 'html',
      attribute: 'data-letter-spacing',
      defaultState: {
        name: 'IOS',
        value: 'ios',
      },
      states: [
        {
          name: 'Android',
          value: 'android',
        },
      ],
    },
  ],
});
```

## Configuration

Configuration params for `rootAttributes` parameter:

| **Name**              | _Default_       | _Variants_                                        | **Description**                  |
| --------------------- | --------------- | ------------------------------------------------- | -------------------------------- |
| rootAttributes        | rootAttribute[] | array with objects, which contain `rootAttribute` | Check more detail info in below  |
| rootAttributesTooltip | false           | boolean value                                     | Add tooltip button for storybook |

Configuration params for `rootAttribute` parameter:

| **Name**     | _Default_ | _Variants_                                                                                          | **Description**                                                                                                         |
| ------------ | --------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| root         | 'html'    | 'html', 'body', or first element returned by 'document.querySelector(), or if none found -- 'html'' | Root node, which attribute will changed by addon                                                                        |
| attribute    | 'class'   | any valid attribute name                                                                            | Attribute name                                                                                                          |
| defaultState | {}        | should contain `name` and `value`                                                                   | Default state for attribute. Value `nil` will remove attribute from root                                                |
| states       | []        | array with objects, which contain unique `name` and `value` for attribute                           | All needed states for attribute values. Each object should contain unique `name` (for button) and `value` for attribute |

Configuration example:

```js
addParameters({
  rootAttributesTooltip: true,
  rootAttributes: [
    {
      root: 'html',
      attribute: 'data-scale-color',
      defaultState: {
        name: 'Light',
        value: 'light',
      },
      states: [
        {
          name: 'Dark',
          value: 'dark',
        },
        {
          name: 'Gray',
          value: 'gray',
        },
      ],
    },
    {
      root: 'html',
      attribute: 'data-letter-spacing',
      defaultState: {
        name: 'IOS',
        value: 'ios',
      },
      states: [
        {
          name: 'Android',
          value: 'android',
        },
      ],
    },
  ],
});
```
