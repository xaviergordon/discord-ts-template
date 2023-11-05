import { interactionOptions } from '../../typings';

export const exampleCommand = {
	name: 'example',
	description: 'Here is an example command.',
	directory: 'utility',
	cooldown: 0,
	permission: {
		bot: ['SendMessages'],
		user: 'SendMessages',
	},
} as interactionOptions;
