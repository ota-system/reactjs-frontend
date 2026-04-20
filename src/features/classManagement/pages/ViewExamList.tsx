import Header from "../components/Header";
import ManagementToggle from "../components/ManagementToggle";
import { StudentList } from "../components/StudentList";

export default function ViewExamList() {
	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<Header />
			<div className="w-full max-w-4xl self-start p-4">
				<ManagementToggle active={"exam"} />
			</div>
			<div className="w-full self-start p-4">
				<StudentList />
			</div>
		</div>
	);
}
