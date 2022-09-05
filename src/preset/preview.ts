/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper
 */
import { addParameters } from '@storybook/react';

import { withRootAttributes } from '../withRootAttributes';

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

export const decorators = [withRootAttributes];
