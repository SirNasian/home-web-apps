import React from 'react';
import ReactDom from 'react-dom';

import {
	Box,
	Container,
	CircularProgress,
	CssBaseline,
	Divider,
	Fab,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';

import moment from 'moment';

import { NotesOverview, OverviewItem } from '../components/NotesOverview';

import { theme_default } from '../themes';

interface Note extends OverviewItem {
	version: number;
	content: string;
}

const createEmptyNote = (): Note => ({
	id: 'new',
	version: 1,
	title: '',
	content: '',
	date: moment().format(),
});

const NotesPage = () => {
	const [searchText, setSearchText] = React.useState<string>('');
	const [overviewLoading, setOverviewLoading] = React.useState<boolean>(true);
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = React.useState<Note>(undefined);

	const style_scrollbox = {
		height: 'calc(100vh - 10rem)',
		overflow: 'auto',
		padding: '0 0.5rem',
	};

	React.useEffect(() => {
		window
			.fetch('/api/notes/overview')
			.then((res) => res.json())
			.then((data) => {
				setNotes(data);
				setOverviewLoading(false);
			});
	}, [overviewLoading, setOverviewLoading]);

	const showLoader = overviewLoading;
	const showSearch = !showLoader && !selectedNote;

	return (
		<ThemeProvider theme={theme_default}>
			<CssBaseline />
			<Container maxWidth='xs'>
				<Box style={{ padding: '1rem 0' }}>
					<Typography style={{ textAlign: 'center' }} variant='h3'>
						NOTES
					</Typography>
					<Divider style={{ margin: '0 0.5rem' }} />
					{showSearch ? (
						<Box padding='0.5rem'>
							<TextField
								fullWidth
								label='Search'
								onChange={(event) => setSearchText(event.target.value)}
								size='small'
								value={searchText}
								variant='outlined'
							/>
						</Box>
					) : null}
					<Box style={style_scrollbox}>
						{showLoader ? (
							<Box
								display='flex'
								height='100%'
								justifyContent='center'
								alignItems='center'
							>
								<CircularProgress />
							</Box>
						) : selectedNote ? null : (
							<NotesOverview items={notes} searchText={searchText} />
						)}
					</Box>
				</Box>
				{selectedNote ? null : (
					<Fab
						color='primary'
						style={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
						onClick={() => setSelectedNote(createEmptyNote())}
					>
						<AddIcon />
					</Fab>
				)}
			</Container>
		</ThemeProvider>
	);
};

ReactDom.render(<NotesPage />, document.querySelector('#root'));
