import express from 'express';
import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { app, pool };

app.use((req, res, next) => {
    console.log(`Consulta realizada a: ${req.path}`);
    next();
});

app.get('/joyas', async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const [orderField, orderDirection] = order_by.split('_');
        const offset = (page - 1) * limits;

        const query = `
            SELECT * FROM inventario
            ORDER BY ${orderField} ${orderDirection}
            LIMIT $1 OFFSET $2;
        `;
        const { rows } = await pool.query(query, [limits, offset]);

        const response = rows.map(joya => ({
            ...joya,
            links: {
                self: `http://localhost:3000/joyas/${joya.id}`,
            },
        }));

        res.json({ joyas: response });
    } catch (error) {
        res.status(500).send('Error al obtener joyas.');
    }
});

app.get('/joyas/filtros', async (req, res) => {
    try {
        const { precio_min = 0, precio_max = 999999, categoria, metal } = req.query;

        let query = 'SELECT * FROM inventario WHERE precio BETWEEN $1 AND $2';
        const params = [precio_min, precio_max];

        if (categoria) {
            query += ' AND categoria = $3';
            params.push(categoria);
        }
        if (metal) {
            query += ' AND metal = $4';
            params.push(metal);
        }

        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error al filtrar joyas.');
    }
});