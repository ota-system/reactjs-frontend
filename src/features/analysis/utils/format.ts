export function formatTestLabel(name: string, createdAt: string) {
	const d = new Date(createdAt);
	return `${name} - ${d.getDate()} ${d.toLocaleString("vi", { month: "short" })} ${d.getFullYear()}`;
}
