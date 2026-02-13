import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/authRoutes'
import leadRoutes from './routes/leadRoutes'
import dashboardRoutes from './routes/dashboardRoutes'

const app = express()

// Security Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LeadFlow CRM API is running' })
})

// Error Handling
app.use(errorHandler)

export default app
