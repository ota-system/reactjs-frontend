import { useReducer } from "react";

const defaultSubjects = ["Tiếng Anh"];

type State = {
	subjects: string[];
	addingNew: boolean;
	newSubject: string;
	pendingSubject: string | null;
};

type Action =
	| { type: "SET_NEW_SUBJECT"; payload: string }
	| { type: "TOGGLE_ADDING"; payload: boolean }
	| { type: "ADD_SUBJECT" }
	| { type: "SET_PENDING"; payload: string | null }
	| { type: "RESET" };

const initialState: State = {
	subjects: defaultSubjects,
	addingNew: false,
	newSubject: "",
	pendingSubject: null,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_NEW_SUBJECT":
			return { ...state, newSubject: action.payload };

		case "TOGGLE_ADDING":
			return { ...state, addingNew: action.payload };

		case "SET_PENDING":
			return { ...state, pendingSubject: action.payload };

		case "ADD_SUBJECT": {
			const value = state.newSubject.trim();
			if (!value) {
				return state;
			}

			if (!state.subjects.includes(value)) {
				return {
					...state,
					subjects: [...state.subjects, value],
					pendingSubject: value,
					newSubject: "",
					addingNew: false,
				};
			}

			return {
				...state,
				pendingSubject: value,
				newSubject: "",
				addingNew: false,
			};
		}

		case "RESET":
			return initialState;

		default:
			return state;
	}
};

export const useSubjectForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return { state, dispatch };
};
