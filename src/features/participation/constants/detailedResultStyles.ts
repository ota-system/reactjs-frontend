export const DETAILED_RESULT_COLORS = {
	CORRECT: {
		TEXT: "text-green-600",
		BORDER: "border-[#1E7C5C]",
		BORDER_LIGHT: "border-[#1E7C5C]",
	},
	INCORRECT: {
		TEXT: "text-red-500",
		TEXT_NAV: "text-red-600",
		BORDER: "border-[#DB513C]",
	},
	PENDING: {
		TEXT: "text-yellow-600",
		BORDER: "border-[#D3B473]",
	},
};

export const DETAILED_RESULT_COMMON_CLASSES = {
	ANSWER_ITEM: "h-16 flex items-center px-5 rounded-md border-2 text-base",
	ANSWER_INPUT: "px-4 py-3 rounded-md border text-base",
	NAV_BUTTON_BASE:
		"h-12 rounded-xl text-sm font-medium transition-all border cursor-pointer",
	SIDEBAR_CONTAINER: "w-72 border-l p-5",
};
