import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/users.routes';
import cors, { CorsOptions } from 'cors';
import { envConfig } from '~/constants/config';
import { defaultErrorHandler } from '~/middlewares/error.middlewares';
import databaseService from '~/services/database.services';
import { config } from 'dotenv';

databaseService.connect();

const app = express();
const port = 4000;

// Middleware for parsing JSON bodies
app.use(express.json());

const corsOptions: CorsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

// Routes
app.use('/users', userRoutes);

// Error handling middleware
app.use(defaultErrorHandler);

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
