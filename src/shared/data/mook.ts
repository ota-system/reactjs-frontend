const user = {
	name: "Vo Duc Tai",
	email: "voductaitxqt123@gmail.com",
	role: "STUDENT",
	// role: "TEACHER",
	avatarUrl: null,
};

const testSubmittedResponse = {
	score: 5.0,
	correctRate: 50.0,
	subject: "Grammar & Vocabulary Test - Unit 1",
	correctQuestions: 10,
	totalQuestions: 20,
	fraud: [
		{
			type: "VISIBILITY CHANGE",
			times: 4,
		},
		{
			type: "FULLSCREEN EXIT",
			times: 1,
		},
	],
};

export { testSubmittedResponse, user };
