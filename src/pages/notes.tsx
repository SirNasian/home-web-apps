import React from 'react';
import ReactDom from 'react-dom';

import {
	Box,
	Container,
	CircularProgress,
	CssBaseline,
	Divider,
	Fab,
	Snackbar,
	TextField,
	Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Home as HomeIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';

import moment from 'moment';

import { NotesOverview } from '../components/NotesOverview';
import { NotesEditor } from '../components/NotesEditor';
import { Note } from '../models/Note';

import { theme_default } from '../themes';

interface Toast {
	open: boolean;
	content: string;
	severity: 'error' | 'warning' | 'info' | 'success';
}

const NOTE_EMPTY: Note = {
	id: '',
	version: 1,
	title: '',
	content: '',
	date: moment().format(),
};

const TOAST_DEFAULT: Toast = {
	open: false,
	content: '',
	severity: 'info',
};

const NotesPage = () => {
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [notesLoading, setNotesLoading] = React.useState<boolean>(true);
	const [searchText, setSearchText] = React.useState<string>('');
	const [selectedID, setSelectedID] = React.useState<string>(undefined);
	const [toast, setToast] = React.useState<Toast>(TOAST_DEFAULT);

	const showLoader = notesLoading;
	const showSearch = !showLoader && selectedID === undefined;
	const selectedNote =
		selectedID === ''
			? NOTE_EMPTY
			: notes.find((note) => note.id == selectedID);

	const style_scrollbox = {
		height: `calc(100vh - ${showSearch ? 10 : 6}rem)`,
		overflow: 'auto',
		padding: '0 0.5rem',
	};

	const handleNoteSave = (id: string, title: string, content: string) => {
		setNotesLoading(true);
		saveNote(id, title, content)
			.then((idNew) => setSelectedID(idNew))
			.then(() => loadNotes())
			.then((notes) => setNotes(notes))
			.then(() => popupToast('Saved Successfully!', 'success'))
			.catch((err) => popupToast(err.message, 'error'))
			.finally(() => setNotesLoading(false));
	};

	const handleRefresh = () => {
		setNotesLoading(true);
		loadNotes()
			.then((notes) => setNotes(notes))
			.then(() => popupToast('Notes Reloaded!', 'success'))
			.catch((err) => popupToast(err.message, 'error'))
			.finally(() => setNotesLoading(false));
	};

	const loadNotes = (): Promise<Note[]> => {
		return window.fetch('/api/notes/overview').then((res) => res.json());
	};

	const saveNote = (
		id: string,
		title: string,
		content: string
	): Promise<string> => {
		return window
			.fetch('/api/notes/item', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: id,
					title: title,
					content: content,
				}),
			})
			.then((res) => res.json())
			.then((json) => json.id);
	};

	const popupToast = (
		content: string,
		severity: 'error' | 'warning' | 'info' | 'success'
	) =>
		setToast({
			open: true,
			content: content,
			severity: severity,
		});

	React.useEffect(() => {
		setNotesLoading(true);
		loadNotes()
			.then((notes) => setNotes(notes))
			.then(() => setNotesLoading(false));
	}, []);

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
				onClick={handleRefresh}
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
								onCancel={() => setSelectedID(undefined)}
								onSave={handleNoteSave}
							/>
						) : (
							<NotesOverview
								items={notes}
								onSelectNote={(id) => setSelectedID(id)}
								searchText={searchText}
							/>
						)}
					</Box>
				</Box>
			</Container>
			<Snackbar
				open={toast.open}
				autoHideDuration={3000}
				onClose={(event, reason) =>
					setToast({ ...toast, open: reason === 'clickaway' })
				}
			>
				<Alert
					severity={toast.severity}
					onClick={() => setToast({ ...toast, open: false })}
				>
					{toast.content}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
};

ReactDom.render(<NotesPage />, document.querySelector('#root'));
