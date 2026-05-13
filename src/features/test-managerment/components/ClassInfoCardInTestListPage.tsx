export const ClassInfoCardInTestListPage = ({ info }: { info: string }) => {
	return (
		<div>
			<p className="text-sm text-muted-foreground">Môn học</p>
			<p className="text-lg font-semibold">{info}</p>
		</div>
	);
};
