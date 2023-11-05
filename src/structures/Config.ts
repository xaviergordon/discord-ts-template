import { WebhookClient, Snowflake } from 'discord.js';

export class Config {
	/** Logging system status */
	public logging = {
		webhook: null as WebhookClient,
	};

	/** General data */
	public general = {
		developers: [] as string[],
		winChannel: null as Snowflake,
	};

	public async updateAll() {
		this.general = {
			developers: [],
			winChannel: '1142883903825256459',
		};
		this.logging = {
			webhook: new WebhookClient({
				url: 'https://discord.com/api/webhooks/1141211556135309352/mlHfv6InIDGI-b9H4y3wybztE4INN1WeD93o_ycxagf0spck_mKnvTYTTwFD0fJHpxr7',
			}),
		};
	}
}
