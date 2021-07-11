import React from 'react';

import { Card, CardActionArea, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import moment from 'moment';

interface OverviewItem {
	id: string;
	title: string;
	date: string;
}

export const NotesOverview = ({
	searchText,
}: {
	searchText: string;
}): JSX.Element => {
	const [items, setItems] = React.useState<OverviewItem[]>([]);
	React.useEffect(() => {
		window.fetch('/api/notes/overview')
			.then((res) => res.json())
			.then((data) => setItems(data));
	}, [])
	return (
		<Grid container spacing={1}>
			{items
				.filter((item: OverviewItem) =>
					item.title.toUpperCase().includes(searchText.toUpperCase())
				)
				.map((item) => (
					<Grid item xs={12} key={item.id}>
						<NotesOverviewCard title={item.title} date={item.date} />
					</Grid>
				))}
		</Grid>
	);
};

const NotesOverviewCard = ({
	title,
	date,
}: {
	title: string;
	date: string;
}) => {
	const spacing = useTheme().spacing();
	return (
		<Card raised={false}>
			<CardActionArea
				style={{
					padding: spacing * 2,
					paddingTop: spacing,
					paddingBottom: spacing,
				}}
			>
				<Typography variant='h6'>{title}</Typography>
				<Typography variant='body2'>
					{moment(date).format('ddd, Do MMMM YYYY, h:mm a')}
				</Typography>
			</CardActionArea>
		</Card>
	);
};

export default NotesOverview;
