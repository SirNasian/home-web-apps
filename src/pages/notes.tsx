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
import { Home as HomeIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';

import moment from 'moment';

import { NotesOverview, OverviewItem } from '../components/NotesOverview';
import { NotesEditor } from '../components/NotesEditor';

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
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [notesLoading, setNotesLoading] = React.useState<boolean>(true);
	const [searchText, setSearchText] = React.useState<string>('');
	const [selectedNote, setSelectedNote] = React.useState<Note>(undefined);

	React.useEffect(() => {
		window
			.fetch('/api/notes/overview')
			.then((res) => res.json())
			.then((data) => {
				setNotes(data);
				setNotesLoading(false);
			});
	}, [notesLoading, setNotesLoading]);

	const showLoader = notesLoading;
	const showSearch = !showLoader && !selectedNote;

	const style_scrollbox = {
		height: `calc(100vh - ${showSearch ? 10 : 6}rem)`,
		overflow: 'auto',
		padding: '0 0.5rem',
	};

	const handleSelectNote = (id: string) => {
		const note = notes.find((note) => id == note.id);
		setSelectedNote(note ? note : createEmptyNote());
	};

	return (
		<ThemeProvider theme={theme_default}>
			<Fab
				href='/'
				size='small'
				style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}
			>
				<HomeIcon />
			</Fab>
			<Fab
				size='small'
				style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
				onClick={() => setNotesLoading(true)}
			>
				<RefreshIcon />
			</Fab>
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
						) : selectedNote ? (
							<NotesEditor
								id={selectedNote.id}
								title={selectedNote.title}
								content={selectedNote.content}
								onCancel={() => setSelectedNote(undefined)}
								onSave={() => alert('NOT YET IMPLEMENTED')}
							/>
						) : (
							<NotesOverview
								items={notes}
								onSelectNote={handleSelectNote}
								searchText={searchText}
							/>
						)}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

ReactDom.render(<NotesPage />, document.querySelector('#root'));
