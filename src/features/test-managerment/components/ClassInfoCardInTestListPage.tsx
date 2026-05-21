type Props = {
	title: string;
	info: string;
};

export const ClassInfoCardInTestListPage = ({ title, info }: Props) => {
	return (
		<div>
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-lg font-semibold">{info}</p>
		</div>
	);
};
