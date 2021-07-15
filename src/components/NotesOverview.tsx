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

import { OverviewItem } from '../models/OverviewItem';

export const NotesOverview = ({
	items,
	searchText,
	onSelectNote,
}: {
	items: OverviewItem[];
	searchText: string;
	onSelectNote: (id: string) => void;
}): JSX.Element => (
	<React.Fragment>
		<Grid container spacing={1}>
			{items
				.filter((item: OverviewItem) =>
					item.title.toUpperCase().includes(searchText.toUpperCase())
				)
				.map((item) => (
					<Grid item xs={12} key={item.id}>
						<NotesOverviewCard
							id={item.id}
							title={item.title}
							date={item.date}
							onSelectNote={onSelectNote}
						/>
					</Grid>
				))}
		</Grid>
		<Fab
			color='primary'
			style={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
			variant='extended'
			onClick={() => onSelectNote('')}
		>
			<AddIcon style={{ marginRight: '0.2rem' }} />
			NEW
		</Fab>
	</React.Fragment>
);

const NotesOverviewCard = ({
	id,
	title,
	date,
	onSelectNote,
}: {
	id: string;
	title: string;
	date: string;
	onSelectNote: (id: string) => void;
}) => (
	<Card raised={false}>
		<CardActionArea onClick={() => onSelectNote(id)}>
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
