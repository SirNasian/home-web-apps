import React from 'react';
import ReactDom from 'react-dom';

import {
	Box,
	Button,
	Container,
	CssBaseline,
	Divider,
	TextField,
	Typography,
} from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import { NotesOverview, OverviewItem } from '../components/NotesOverview';

import { theme_default } from '../themes';

const NotesPage = () => {
	const [searchText, setSearchText] = React.useState<string>('');
	const [overviewItems, setOverviewItems] = React.useState<OverviewItem[]>([]);

	const spacing = useTheme().spacing();
	const style_scrollbox = {
		height: 'calc(100vh - 10rem)',
		overflow: 'auto',
		paddingLeft: spacing,
		paddingRight: spacing,
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
				<Box style={{ paddingTop: spacing * 2, paddingBottom: spacing * 2 }}>
					<Typography style={{ textAlign: 'center' }} variant='h3'>
						NOTES
					</Typography>
					<Divider />
					<Box style={{ padding: spacing }}>
						<TextField
							fullWidth
							label='Search'
							onChange={(event) => setSearchText(event.target.value)}
							size='small'
							value={searchText}
							variant='outlined'
						/>
					</Box>
					<Box style={style_scrollbox}>
						<NotesOverview items={overviewItems} searchText={searchText} />
					</Box>
				</Box>
				<Box position='absolute' bottom={spacing * 2} right={spacing * 2}>
					<Button
						color='primary'
						disableElevation
						size='large'
						variant='contained'
					>
						ADD NOTE
					</Button>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

ReactDom.render(<NotesPage />, document.querySelector('#root'));
