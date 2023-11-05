export type StreakType = {
	name: StreakNames;
	lastRun: string;
	streak: number;
};

export type StreakNames = 'daily' | 'weekly' | 'monthly';

export type ItemTypes = 'fishing';
