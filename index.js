import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';
import http from 'http';
import { connect } from './config.js';
import { chatModel } from './chat.schema.js';

const app = express();

// create server using http
const server = http.createServer(app);

// create socket server
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// use socket events
io.on('connection', (socket) => {
    console.log('connection is established');

    socket.on('join', (data) => {
        socket.username = data;
    })

    socket.on('new-message', (message) => {
        
        let userMessage = {
            username: socket.username,
            message: message
        }

        const newChat = new chatModel({username: socket.username, message: message, timestamp: new Date()});
        newChat.save();
        // broadcast the message to all the users
        socket.broadcast.emit('broadcast_message', userMessage);
    });

    socket.on('disconnect', () => {
        console.log('connection is disconnected')
    });
});

server.listen(3000, () => {
    console.log('App is listening on port 3000');
    // connect();
});