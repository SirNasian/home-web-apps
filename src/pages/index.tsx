import React from 'react';
import ReactDom from 'react-dom';
import { Button, Container, CssBaseline, Grid, Paper } from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import { style_root_container } from '../styles';
import { theme_default } from '../themes';

const IndexPage = () => (
	<ThemeProvider theme={theme_default}>
		<CssBaseline />
		<Container maxWidth='xs' style={style_root_container}>
			<Paper style={{ padding: useTheme().spacing() * 3 }}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Button
							color='primary'
							disableElevation
							fullWidth
							href='calendar'
							variant='contained'
						>
							CALENDAR
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							color='primary'
							disableElevation
							fullWidth
							href='notes'
							variant='contained'
						>
							NOTES
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	</ThemeProvider>
);

ReactDom.render(<IndexPage />, document.querySelector('#root'));
