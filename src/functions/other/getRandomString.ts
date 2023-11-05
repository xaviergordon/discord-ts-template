export async function getRandomString(strings: string[]) {
	return strings[Math.floor(Math.random() * strings.length)];
}
