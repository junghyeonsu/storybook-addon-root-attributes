import type { DecoratorFunction } from '@storybook/addons';
import addons, { useEffect } from '@storybook/addons';

import { RootAttribute } from './types';
import { EVENTS } from './constants';

interface UpdateRootAttributeParams {
	root: string;
	attribute: string;
	clickedValue: string;
}

const getElement = (root: string) => {
	if (root === 'body') return document.body;
	if (root === 'html') return document.documentElement;
	return document.querySelector(root) || document.documentElement;
};

const updateRootAttribute = ({ root = 'html', attribute, clickedValue }: UpdateRootAttributeParams) => {
	const element = getElement(root);
	element.removeAttribute(attribute);
	element.setAttribute(attribute, clickedValue);
};

const resetRootAttribute = ({ root = 'html', attribute }: Omit<UpdateRootAttributeParams, 'clickedValue'>) => {
	const element = getElement(root);
	element.removeAttribute(attribute);
};

export const withRootAttributes: DecoratorFunction = (StoryFn, context) => {
	const rootAttributes = context.parameters.rootAttributes;

	// init & clean up
	useEffect(() => {
		if (rootAttributes) {
			rootAttributes.map(({ root, attribute, defaultState }: RootAttribute) =>
				updateRootAttribute({ root, attribute, clickedValue: defaultState.value })
			);
		}
		return () => {
			if (rootAttributes) {
				rootAttributes.map(({ root, attribute }: RootAttribute) => resetRootAttribute({ root, attribute }));
			}
		};
	}, []);

	addons.getChannel().on(EVENTS.UPDATE, updateRootAttribute);

	return StoryFn(context);
};
