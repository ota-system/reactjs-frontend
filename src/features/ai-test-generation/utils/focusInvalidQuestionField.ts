import type { RefObject } from "react";
import type { InvalidQuestionIssue } from "./findFirstInvalidQuestionIssue";

interface FocusInvalidQuestionFieldParams {
	issue: InvalidQuestionIssue;
	questionRefs: RefObject<Record<string, HTMLDivElement | null>>;
}

const buildSelector = (issue: InvalidQuestionIssue) => {
	if (issue.field === "question") {
		// biome-ignore lint/security/noSecrets: data-attribute selectors are not secrets
		return '[data-question-field="question"]';
	}

	if (issue.field === "fill-in-blank-answer") {
		return '[data-question-field="fill-in-blank-answer"]';
	}

	if (issue.optionId) {
		return `[data-question-field="multiple-choice-option"][data-multiple-choice-option-id="${issue.optionId}"]`;
	}

	return '[data-question-field="multiple-choice-option"]';
};

const focusInvalidQuestionField = ({
	issue,
	questionRefs,
}: FocusInvalidQuestionFieldParams): boolean => {
	const questionContainer = questionRefs.current[issue.questionId];

	if (!questionContainer) {
		return false;
	}

	const targetField = questionContainer.querySelector<HTMLElement>(
		buildSelector(issue),
	);

	questionContainer.scrollIntoView({
		behavior: "smooth",
		block: "center",
	});

	if (!targetField) {
		return false;
	}

	window.requestAnimationFrame(() => {
		targetField.focus({ preventScroll: true });
	});

	return true;
};

export default focusInvalidQuestionField;
