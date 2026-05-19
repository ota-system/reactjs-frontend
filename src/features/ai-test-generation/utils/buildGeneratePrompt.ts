const buildGeneratePrompt = (prompt: string, subject: string) => {
	const trimmedSubject = subject.trim();
	if (!trimmedSubject) {
		return prompt;
	}

	return `${prompt}\nChủ đề ưu tiên: ${trimmedSubject}`;
};

export default buildGeneratePrompt;
