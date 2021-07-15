/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import * as path from 'path';
import * as moment from 'moment';

const { Client } = require('pg');
const db_client = new Client();
db_client.connect();

const app = express();

app.get('/notes', (req, res) =>
	req ? res.sendFile(path.join(__dirname, 'public/pages/notes.html')) : null
);

app.get('/calendar', (req, res) =>
	req ? res.sendFile(path.join(__dirname, 'public/pages/calendar.html')) : null
);

app.get('/api/notes/overview', (req, res) => {
	db_client
		.query(
			`
				SELECT n1.* FROM notes n1
				INNER JOIN (SELECT id, MAX(version) AS version FROM notes GROUP BY id) AS n2
				ON n2.id = n1.id AND n2.version = n1.version
				ORDER BY date DESC;
			`
		)
		.then((data: { rows: [] }) => res.send(data.rows));
	req ? null : null;
});

app.get('/api/notes/item', (req, res) => {
	db_client
		.query('SELECT * FROM notes WHERE id = $1 ORDER BY version DESC;', [
			req.query.id,
		])
		.then((data: { rows: [] }) => res.send(data.rows));
});

app.post('/api/notes/item', require('body-parser').json(), (req, res) => {
	if (
		(req.body['title']) &&
		(req.body['content'])
	) {
		const id = req.body['id'] ? req.body['id'] : require('uuid').v4();
		if (req.body['id'])
			db_client
				.query(
					`
						INSERT INTO notes
						(id, version, title, content, date)
						VALUES ($1, (SELECT MAX(version)+1 FROM notes WHERE id = $1), $2, $3, $4);
					`,
					[
						id,
						req.body['title'],
						req.body['content'],
						moment().toISOString(),
					])
		else
			db_client
				.query(
					`
						INSERT INTO notes
						(id, version, title, content, date)
						VALUES ($1, 1, $2, $3, $4);
					`,
					[
						id,
						req.body['title'],
						req.body['content'],
						moment().toISOString(),
					]);
		res.status(200).send({ id: id });
	} else res.status(400).send('malformed request syntax');

});

app.use(express.static('public'));
app.listen(3000);
