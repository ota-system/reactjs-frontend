import { create } from "zustand";
import {
	INITIAL_TEST_INFORMATION,
	type TestInformationValues,
} from "../types/TestInformation";

interface EnglishTestInformationStore {
	testInformation: TestInformationValues;
	setTestInformation: (values: TestInformationValues) => void;
	setTestInformationField: (
		field: keyof TestInformationValues,
		value: string | boolean,
	) => void;
	resetTestInformation: () => void;
}

const useEnglishTestInformationStore = create<EnglishTestInformationStore>(
	(set) => ({
		testInformation: INITIAL_TEST_INFORMATION,
		setTestInformation: (values) => set({ testInformation: values }),
		setTestInformationField: (field, value) =>
			set((state) => ({
				testInformation: {
					...state.testInformation,
					[field]: value,
				},
			})),
		resetTestInformation: () =>
			set({ testInformation: INITIAL_TEST_INFORMATION }),
	}),
);

export default useEnglishTestInformationStore;
