import React from 'react';

import {
	Box,
	Card,
	CardActionArea,
	Fab,
	Grid,
	Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import moment from 'moment';

export interface OverviewItem {
	id: string;
	title: string;
	date: string;
}

export const NotesOverview = ({
	items,
	onSelectNote,
	searchText,
}: {
	items: OverviewItem[];
	onSelectNote: (id: string) => void;
	searchText: string;
}): JSX.Element => (
	<React.Fragment>
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
		<Fab
			color='primary'
			style={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
			onClick={() => onSelectNote('')}
		>
			<AddIcon />
		</Fab>
	</React.Fragment>
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
