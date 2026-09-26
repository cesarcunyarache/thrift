import express from 'express'
import next from 'next'
import axios from 'axios'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//
import http from 'http';
import { Server as socketIO } from 'socket.io';
//

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);

    // Scheduler
    const runScheduler = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/services/scheduler`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);

        runScheduler();
    });
});