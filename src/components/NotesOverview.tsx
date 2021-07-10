import React from 'react';

import { Card, CardActionArea, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import moment from 'moment';

const mock_data = [
	{
		title: 'Shopping List',
		date: new Date().toISOString(),
	},
	{
		title: 'To Do',
		date: new Date().toISOString(),
	},
	{
		title: 'Timesheet',
		date: new Date().toISOString(),
	},
	{
		title: 'Wedding',
		date: new Date().toISOString(),
	},
	{
		title: 'Budget',
		date: new Date().toISOString(),
	},
	{
		title: 'Makki',
		date: new Date().toISOString(),
	},
	{
		title: 'House',
		date: new Date().toISOString(),
	},
	{
		title: 'Birthday',
		date: new Date().toISOString(),
	},
	{
		title: 'Thoughts',
		date: new Date().toISOString(),
	},
];

export const NotesOverview = ({
	searchText,
}: {
	searchText: string;
}): JSX.Element => {
	return (
		<Grid container spacing={1}>
			{mock_data
				.filter((item) =>
					item.title.toUpperCase().includes(searchText.toUpperCase())
				)
				.map((item, index) => (
					<Grid item xs={12} key={index}>
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
