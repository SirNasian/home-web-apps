import * as express from 'express';
import * as path from 'path';
const app = express();
app.get('/notes', (req, res) =>
	req ? res.sendFile(path.join(__dirname, 'public/pages/notes.html')) : null
);
app.get('/calendar', (req, res) =>
	req ? res.sendFile(path.join(__dirname, 'public/pages/calendar.html')) : null
);
app.use(express.static('public'));
app.listen(3000);
