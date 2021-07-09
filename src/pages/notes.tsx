import React from 'react';
import ReactDom from 'react-dom';
import { Container, CssBaseline, Paper } from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import { style_root_container } from '../styles';
import { theme_default } from '../themes';

const NotesPage = () => (
	<ThemeProvider theme={theme_default}>
		<CssBaseline />
		<Container maxWidth='xs' style={style_root_container}>
			<Paper style={{ padding: useTheme().spacing() * 3 }}>TODO</Paper>
		</Container>
	</ThemeProvider>
);

ReactDom.render(<NotesPage />, document.querySelector('#root'));
