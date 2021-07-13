import React from 'react';
import ReactDom from 'react-dom';

import {
	Box,
	Container,
	CssBaseline,
	Divider,
	Fab,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';

import { NotesOverview, OverviewItem } from '../components/NotesOverview';

import { theme_default } from '../themes';

const NotesPage = () => {
	const [searchText, setSearchText] = React.useState<string>('');
	const [overviewItems, setOverviewItems] = React.useState<OverviewItem[]>([]);

	const style_scrollbox = {
		height: 'calc(100vh - 10rem)',
		overflow: 'auto',
	};

	React.useEffect(() => {
		window
			.fetch('/api/notes/overview')
			.then((res) => res.json())
			.then((data) => setOverviewItems(data));
	}, []);

	return (
		<ThemeProvider theme={theme_default}>
			<CssBaseline />
			<Container maxWidth='xs'>
				<Box style={{ padding: '1rem 0' }}>
					<Typography style={{ textAlign: 'center' }} variant='h3'>
						NOTES
					</Typography>
					<Divider />
					<TextField
						fullWidth
						label='Search'
						onChange={(event) => setSearchText(event.target.value)}
						size='small'
						style={{ margin: '0.5rem 0' }}
						value={searchText}
						variant='outlined'
					/>
					<Box style={style_scrollbox}>
						<NotesOverview items={overviewItems} searchText={searchText} />
					</Box>
				</Box>
				<Fab
					color='primary'
					style={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
				>
					<AddIcon />
				</Fab>
			</Container>
		</ThemeProvider>
	);
};

ReactDom.render(<NotesPage />, document.querySelector('#root'));
