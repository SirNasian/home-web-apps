import React from 'react';

import { Fab, TextField } from '@material-ui/core';
import { Cancel as CancelIcon, Save as SaveIcon } from '@material-ui/icons';

export const NotesEditor = ({
	id,
	title,
	content,
	onCancel,
	onSave,
}: {
	id: string;
	title: string;
	content: string;
	onCancel: () => void;
	onSave: (id: string, title: string, content: string) => void;
}): JSX.Element => {
	const [noteTitle, setNoteTitle] = React.useState<string>(title);
	const [noteContent, setNoteContent] = React.useState<string>(content);
	const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
	const view_height = document.documentElement.clientHeight;
	const rows = Math.floor((view_height - 15 * rem + 21) / (rem + 3));
	return (
		<React.Fragment>
			<TextField
				error={!noteTitle}
				fullWidth
				label='Title'
				size='small'
				style={{ marginTop: '1rem' }}
				value={noteTitle}
				variant='outlined'
				onChange={(event) => setNoteTitle(event.target.value)}
			/>
			<TextField
				error={!noteContent}
				fullWidth
				label='Content'
				multiline
				rows={rows}
				size='small'
				style={{ margin: '1rem 0' }}
				value={noteContent}
				variant='outlined'
				onChange={(event) => setNoteContent(event.target.value)}
			/>
			<Fab
				color='secondary'
				style={{ position: 'absolute', left: '1rem', bottom: '1rem' }}
				variant='extended'
				onClick={onCancel}
			>
				<CancelIcon style={{ marginRight: '0.2rem' }} />
				CANCEL
			</Fab>
			<Fab
				color='primary'
				disabled={!noteTitle || !noteContent}
				style={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
				variant='extended'
				onClick={() => onSave(id, noteTitle, noteContent)}
			>
				<SaveIcon style={{ marginRight: '0.2rem' }} />
				SAVE
			</Fab>
		</React.Fragment>
	);
};

export default NotesEditor;
