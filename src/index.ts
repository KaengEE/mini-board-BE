import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import cors from 'cors';

//환경변수설정
dotenv.config();

const app = express();
const PORT = 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

// PostgreSQL 연결 테스트
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0].now);
  }
});

app.use(express.json());
app.use('/posts',postRoutes);
app.use('/comment', commentRoutes);


//cors 설정
const corsOptions = {
    origin: 'http://localhost:5173', // Vue 애플리케이션의 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 인증 정보를 포함할 경우 true로 설정
  };
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { pool };