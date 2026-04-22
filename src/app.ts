import express from 'express';
import authRoutes from './routes/auth.routes';
import businessRoutes from './routes/business.routes';
import userRoutes from './routes/user.routes';
import employeeDetailRoutes from './routes/employee-detail.routes';
import clientDetailRoutes from './routes/client-detail.routes';
import appointmentRoutes from './routes/appointment.routes';
import { errorHandler } from './middlewares/error.middleware';
import { errorResponse } from './utils/response';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy', data: null });
});

app.use('/auth', authRoutes);
app.use('/business', businessRoutes);
app.use('/users', userRoutes);
app.use('/employee-details', employeeDetailRoutes);
app.use('/client-details', clientDetailRoutes);
app.use('/appointments', appointmentRoutes);

app.use((req, res) => {
  res.status(404).json(errorResponse('Route not found'));
});

app.use(errorHandler);

export default app;
