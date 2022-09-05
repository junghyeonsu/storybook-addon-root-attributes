import React from 'react';
import { useAddonState, useGlobals, useStorybookApi } from '@storybook/api';
import { AddonPanel, H2, Button } from '@storybook/components';
import { EVENTS, PARAM_KEY, ACTIVE_PARAM_KEY } from './constants';

import type { RootAttribute } from './types';

interface PanelProps {
	active: boolean;
	key: string;
}

export const Panel = (props: PanelProps) => {
	const api = useStorybookApi();
	const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
	const [globals, setGlobals] = useGlobals();

	if (!rootAttributes) return null;
	if (!Array.isArray(rootAttributes)) return <div>Root Attributes have to array</div>;

	return (
		<AddonPanel {...props}>
			{rootAttributes.map((rootAttribute: RootAttribute) => {
				const { root, attribute, defaultState, states } = rootAttribute;
				return (
					<div key={attribute}>
						<H2>{attribute}</H2>
						<Button
							secondary={!globals[attribute] || globals[attribute] === defaultState.value}
							onClick={() => {
								api.emit(EVENTS.UPDATE, {
									root,
									attribute,
									clickedValue: defaultState.value,
								});
								setGlobals({ [attribute]: defaultState.value });
							}}
						>
							{defaultState.name}
						</Button>
						{states.map((state) => (
							<Button
								key={state.name}
								secondary={globals[attribute] === state.value}
								onClick={() => {
									api.emit(EVENTS.UPDATE, {
										root,
										attribute,
										clickedValue: state.value,
									});
									setGlobals({ [attribute]: state.value });
								}}
							>
								{state.name}
							</Button>
						))}
					</div>
				);
			})}
		</AddonPanel>
	);
};
