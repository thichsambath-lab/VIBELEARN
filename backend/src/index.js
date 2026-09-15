import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { clerkAuth } from './middlewares/auth.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import progressRoutes from './routes/progress.routes.js';

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Attach Clerk authentication middleware
app.use(clerkAuth);

// API route mounts
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Vibelearn backend listening on http://localhost:${PORT}`);
});

export default app;
