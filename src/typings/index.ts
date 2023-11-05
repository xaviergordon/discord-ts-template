import type {
	AnySelectMenuInteraction,
	AutocompleteInteraction,
	ButtonInteraction,
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	EmbedBuilder,
	ModalSubmitFields,
	ModalSubmitInteraction,
	PermissionResolvable,
	UserContextMenuCommandInteraction,
} from 'discord.js';
import { ExtendedClient } from '../structures/Client';

// Logger

export interface LoggerClientOptions {
	timezone: string;
}

export interface LoggerDataOptions {
	source?: 'unhandledRejection' | 'uncaughtException' | 'warning' | any;
	reason?: Error;
	showDate?: boolean;
	space?: boolean;
}

// Command Interaction

export interface executeOptions {
	client?: ExtendedClient;
	interaction?: CommandInteraction;
	options?: CommandInteractionOptionResolver;
}

export interface buttonExcuteOptions {
	client?: ExtendedClient;
	interaction?: ButtonInteraction;
	options?: Array<string>;
}

export interface modalExecuteOptions {
	client?: ExtendedClient;
	interaction?: ModalSubmitInteraction;
	fields?: ModalSubmitFields;
	options?: Array<String>;
}

export interface selectMenuExecuteOptions {
	client?: ExtendedClient;
	interaction?: AnySelectMenuInteraction;
	values?: String[];
	options?: Array<String>;
}

export interface autocompleteOptions {
	client?: ExtendedClient;
	interaction?: AutocompleteInteraction;
}

type executeFunction = (options: executeOptions) => any;
type buttonExcuteFunction = (options: buttonExcuteOptions) => any;
type modalExecuteFunction = (options: modalExecuteOptions) => any;
type selectMenuExecuteFunction = (options: selectMenuExecuteOptions) => any;
type autocompleteFunction = (options: autocompleteOptions) => any;

type commandDirectories = 'utility';

export type interactionOptions = {
	name: string;
	description?: string;
	directory: commandDirectories;
	cooldown?: number;
	permission: {
		bot: PermissionResolvable[];
		user: PermissionResolvable;
	};
} & ChatInputApplicationCommandData;

export type commandType = {
	interaction: interactionOptions;
	execute: executeFunction;
	autocomplete?: autocompleteFunction;
};

export type buttonType = {
	customId: string;
	cooldown?: number;
	permission?: PermissionResolvable;
	execute: buttonExcuteFunction;
};

export type modalType = {
	customId: string;
	permission?: {
		bot: PermissionResolvable[];
		user: PermissionResolvable;
	};
	execute: modalExecuteFunction;
};

export type selectMenuType = {
	customId: string;
	permission?: PermissionResolvable;
	execute: selectMenuExecuteFunction;
};

// Discord chat timestamps

export type DiscordTimestampsNames =
	| 'Short Time'
	| 'Long Time'
	| 'Short Date'
	| 'Long Date'
	| 'Short Date/Time'
	| 'Long Date/Time'
	| 'Relative Time';

export enum discordTimestampUnixs {
	'Short Time' = 't',
	'Long Time' = 'T',
	'Short Date' = 'd',
	'Long Date' = 'D',
	'Short Date/Time' = 'f',
	'Long Date/Time' = 'F',
	'Relative Time' = 'R',
}

// Painator

export type PaginatorInteractionTypes = CommandInteraction | UserContextMenuCommandInteraction | ModalSubmitInteraction;

export interface paginatorOptions {
	array: any[];
	itemPerPage: number;
	joinWith?: string;
	time: number;
	embed: EmbedBuilder;
	ephemeral?: boolean;
}

export interface paginatorStatusOptions {
	totalPages: number;
	currentPage: number;
	slice1: number;
	slice2: number;
}

// Emojis

export type EmojisConfigTypes = 'success' | 'error' | 'attention';

export interface emojisConfigTypes {
	success: string;
	error: string;
	attention: string;
}

export enum emojisConfigDefaults {
	success = '✅',
	error = '❌',
	attention = '⚠️',
}
