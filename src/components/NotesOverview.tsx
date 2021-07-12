import React from 'react';

import { Box, Card, CardActionArea, Grid, Typography } from '@material-ui/core';

import moment from 'moment';

export interface OverviewItem {
	id: string;
	title: string;
	date: string;
}

export const NotesOverview = ({
	items,
	searchText,
}: {
	items: OverviewItem[];
	searchText: string;
}): JSX.Element => (
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

const NotesOverviewCard = ({
	title,
	date,
}: {
	title: string;
	date: string;
}) => (
	<Card raised={false}>
		<CardActionArea>
			<Box px={2} py={1}>
				<Typography variant='h6'>{title}</Typography>
				<Typography variant='body2'>
					{moment(date).format('ddd, Do MMMM YYYY, h:mm a')}
				</Typography>
			</Box>
		</CardActionArea>
	</Card>
);

export default NotesOverview;
