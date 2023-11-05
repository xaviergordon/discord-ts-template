import { Modal } from '../../structures/Modal';

export default new Modal({
	customId: 'example',
	permission: {
		bot: ['SendMessages'],
		user: 'SendMessages',
	},
	execute: async ({ client, interaction }) => {
		await interaction.reply({ embeds: [client.embeds.success('Modal received.')], ephemeral: true });
	},
});
