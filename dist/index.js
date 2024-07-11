"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const cors_1 = __importDefault(require("cors"));
//환경변수설정
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
exports.pool = pool;
// PostgreSQL 연결 테스트
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
    else {
        console.log('Connected to PostgreSQL:', res.rows[0].now);
    }
});
app.use(express_1.default.json());
app.use('/posts', postRoutes_1.default);
app.use('/comment', commentRoutes_1.default);
//cors 설정
const corsOptions = {
    origin: 'http://localhost:5173', // Vue 애플리케이션의 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 인증 정보를 포함할 경우 true로 설정
};
app.use((0, cors_1.default)(corsOptions));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
