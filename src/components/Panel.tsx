import React from 'react';
import { useGlobals, useStorybookApi } from '@storybook/api';
import { AddonPanel, H2, Button, Div } from '@storybook/components';
import { EVENTS, PARAM_KEY } from '../constants';

import type { RootAttribute } from '../types';

interface PanelProps {
	active: boolean;
	key: string;
}

export const Panel = (props: PanelProps) => {
	const api = useStorybookApi();
	const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
	const [globals, setGlobals] = useGlobals();

	if (!rootAttributes) return null;
	if (!Array.isArray(rootAttributes)) return <Div>Root Attributes have to array</Div>;

	return (
		<AddonPanel {...props}>
			{rootAttributes.map((rootAttribute: RootAttribute) => {
				const { root, attribute, defaultState, states } = rootAttribute;

				const isDefaultPrimary = !globals[attribute] || globals[attribute] === defaultState.value;

				return (
					<Div style={{ padding: '20px' }} key={attribute}>
						<H2>{attribute}</H2>
						<Div style={{ display: 'flex', columnGap: '10px' }}>
							<Button
								primary={isDefaultPrimary}
								gray={!isDefaultPrimary}
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
									primary={globals[attribute] === state.value}
									gray={globals[attribute] !== state.value}
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
						</Div>
					</Div>
				);
			})}
		</AddonPanel>
	);
};
