import React from 'react';
import { useAddonState, useGlobals, useStorybookApi } from '@storybook/api';
import { Icons, IconButton, WithTooltip, TooltipLinkList, Badge } from '@storybook/components';

import { PARAM_KEY, TOOL_ID, ACTIVE_PARAM_KEY, EVENTS } from '../constants';
import { RootAttribute } from '../types';

// https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
export const Tool = () => {
	const api = useStorybookApi();
	const rootAttributes = api.getCurrentParameter<RootAttribute[]>(PARAM_KEY);
	const [isActive, setIsActive] = useAddonState<boolean>('isActive', false);
	const [globals, setGlobals] = useGlobals();

	if (!rootAttributes) return null;
	if (!Array.isArray(rootAttributes)) return <div>Root Attributes have to array</div>;

	const toggleMyTool = () => setIsActive((prev) => !prev);

	const lists = rootAttributes.map(({ root, attribute, defaultState, states }) => {
		return {
			attribute,
			list: [
				{
					id: defaultState.value,
					title: defaultState.name,
					onClick: () => {
						api.emit(EVENTS.UPDATE, {
							root,
							attribute,
							clickedValue: defaultState.value,
						});
						setGlobals({ [attribute]: defaultState.value });
					},
					right: null,
					active: !globals[attribute] || globals[attribute] === defaultState.value,
				},
				...states.map((state) => ({
					id: state.value,
					title: state.name,
					onClick: () => {
						api.emit(EVENTS.UPDATE, {
							root,
							attribute,
							clickedValue: state.value,
						});
						setGlobals({ [attribute]: state.value });
					},
					right: null,
					active: globals[attribute] === state.value,
				})),
			],
		};
	});

	return (
		<WithTooltip
			placement="top"
			trigger="click"
			key={TOOL_ID}
			tooltipShown={isActive}
			onVisibilityChange={toggleMyTool}
			tooltip={lists.map(({ attribute, list }) => (
				<div key={attribute}>
					<Badge status="critical">{attribute}</Badge>
					<TooltipLinkList links={list} />
				</div>
			))}
			closeOnClick={true}
		>
			<IconButton key="root-attribute" active={true} title="Root Attributes">
				<Icons icon="structure" />
			</IconButton>
		</WithTooltip>
	);
};
