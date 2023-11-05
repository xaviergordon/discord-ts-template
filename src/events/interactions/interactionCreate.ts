import { Collection, CommandInteractionOptionResolver, EmbedBuilder, GuildMember } from 'discord.js';

import { client } from '../..';
import { Event } from '../../structures/Event';

const cooldown = new Collection<string, number>();
const buttonCooldown = new Collection<string, number>();

export default new Event('interactionCreate', async (interaction) => {
	if (!interaction.inGuild()) return;
	if (!interaction.inCachedGuild()) return;
	const member = interaction.member as GuildMember;

	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		const commandName = interaction.options.getSubcommandGroup()
			? `${
					interaction.commandName
			  }${interaction.options.getSubcommandGroup()}${interaction.options.getSubcommand()}`
			: interaction.options.data[0]?.type == 1
			? `${interaction.commandName}${interaction.options.getSubcommand()}`
			: interaction.commandName;

		if (!command) {
			return await interaction.reply({
				embeds: [client.embeds.error(`This command is non-existent.`)],
				ephemeral: true,
			});
		}

		if (!member.permissions.has(command.interaction.permission?.user || 'SendMessages')) {
			return await interaction.reply({
				embeds: [
					client.embeds.attention(
						`This command requires the **${command.interaction.permission}** permission.`
					),
				],
				ephemeral: true,
			});
		}

		if (!interaction.appPermissions.has(command.interaction?.permission?.bot || ['SendMessages'])) {
			return await interaction.reply({
				embeds: [
					client.embeds.attention(
						`I require the **${command.interaction.permission?.bot.join(
							', '
						)}** permission(s) for this command to run.`
					),
				],
				ephemeral: true,
			});
		}

		if (cooldown.has(`${commandName}${interaction.user.id}`)) {
			const remaining = cooldown.get(`${commandName}${interaction.user.id}`);
			const cooldownEmbed = new EmbedBuilder()
				.setColor('#964B00')
				.setDescription(`🕰️ | You can use this command again <t:${Math.floor(remaining / 1000)}:R>`);
			return await interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
		}

		await command.execute({
			client: client,
			interaction: interaction,
			options: interaction.options as CommandInteractionOptionResolver,
		});

		if (command.interaction.cooldown) {
			cooldown.set(`${commandName}${interaction.user.id}`, Date.now() + command.interaction.cooldown || 2000);
			setTimeout(() => {
				cooldown.delete(`${commandName}${interaction.user.id}`);
			}, command.interaction.cooldown);
		}
	}
	if (interaction.isAutocomplete()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) {
			return await interaction.respond([]);
		}
		return await command.autocomplete({
			client: client,
			interaction: interaction,
		});
	}
	if (interaction.isButton()) {
		if (interaction.customId.startsWith('cltr')) return;
		const buttonName = interaction.customId.split('-')[0];
		const button = client.buttons.get(buttonName);
		if (!button) return;

		if (!member.permissions.has(button.permission)) {
			return interaction.reply({
				embeds: [client.embeds.attention(`This button requires the **${button.permission}** permission.`)],
				ephemeral: true,
			});
		}

		if (buttonCooldown.has(`${button.customId}${interaction.user.id}`)) {
			const remainingCooldown = buttonCooldown.get(`${button.customId}${interaction.user.id}`);
			const cooldownEmbed = new EmbedBuilder()
				.setColor('#964B00')
				.setDescription(`🕰️ | You can use this button again <t:${Math.floor(remainingCooldown / 1000)}:R>`);

			return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
		}
		if (button.cooldown) {
			buttonCooldown.set(`${button.customId}${interaction.user.id}`, Date.now() + button.cooldown);
			setTimeout(() => {
				buttonCooldown.delete(`${button.customId}${interaction.user.id}`);
			}, button.cooldown);
		}
		await button.execute({
			client: client,
			interaction: interaction,
			options: interaction.customId.split('-'),
		});
	}
	if (interaction.isAnySelectMenu()) {
		const menuName = interaction.customId.split('-')[0];
		const values = interaction.values;
		const selectMenu = client.menus.get(menuName);

		if (!selectMenu) return;
		if (!member.permissions.has(selectMenu.permission)) {
			return await interaction.reply({
				embeds: [client.embeds.attention(`This menu requires the **${selectMenu.permission}** permission.`)],
				ephemeral: true,
			});
		}

		await selectMenu.execute({
			client: client,
			interaction: interaction,
			values: values,
			options: interaction.customId.split('-'),
		});
	}
	if (interaction.isModalSubmit()) {
		const modalName = interaction.customId.split('-')[0];
		const fields = interaction.fields;
		const modal = client.modals.get(modalName);

		if (!modal) return;
		if (!member.permissions.has(modal.permission?.user)) {
			return interaction.reply({
				embeds: [client.embeds.attention(`This modal requires the **${modal.permission}** permission.`)],
			});
		}

		if (!interaction.appPermissions.has(modal?.permission?.bot || ['SendMessages'])) {
			return await interaction.reply({
				embeds: [
					client.embeds.attention(
						`I require the **${modal.permission?.bot.join(', ')}** permission(s) for this command to run.`
					),
				],
				ephemeral: true,
			});
		}

		await modal.execute({
			client: client,
			interaction: interaction,
			fields: fields,
			options: interaction.customId.split('-'),
		});
	}
});
