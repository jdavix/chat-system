import express from 'express';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import applyRoutes from './routes';
import { handleError } from './lib/error';

const app = express();

// Adding features:
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// Setup port

const port = process.env.PORT || 3001;

// Setup router:

const router = express.Router();

applyRoutes(router);

app.use('/api/v1', router);


// Error middleaware

app.use((err, req, res, next) => {
  handleError(err, res);
});

// starting server:

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


// socket io setup:

const io = socket(server);

io.on('connection', (s) => {
  s.on('SEND_MESSAGE', (data) => {
    console.log('received data: ', data);
    io.emit('RECEIVE_MESSAGE', data);
  });
});
