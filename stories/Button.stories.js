import React from 'react';
import { Button } from './Button';

export default {
	title: 'Example/Button',
	component: Button,
	parameters: {
		myAddonParameter: `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
		rootAttributes: [
			{
				root: 'html',
				attribute: 'data-seed-scale-color2',
				defaultState: {
					name: 'Light2',
					value: 'light2',
				},
				states: [
					{
						name: 'Dark2',
						value: 'dark2',
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
	label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	label: 'Button',
};
