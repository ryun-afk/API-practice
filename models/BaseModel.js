const pool = require('../config/dbconfig.js');

class BaseModel {
    constructor(table) {
        this.table = table;
    }

    async findAll() {
        const query = `SELECT * FROM ${this.table}`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(`Error fetching from ${this.table}:`, err.stack);
            throw err;
        }
    }

    async findById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = $1`;
        try {
            const res = await pool.query(query, [id]);
            return res.rows[0];
        } catch (err) {
            console.error(`Error fetching from ${this.table}:`, err.stack);
            throw err;
        }
    }

    async create(data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;

        try {
            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error(`Error inserting into ${this.table}:`, err.stack);
            throw err;
        }
    }

    async update(id, data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
        
        const query = `UPDATE ${this.table} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`;

        try {
            const res = await pool.query(query, [...values, id]);
            return res.rows[0];
        } catch (err) {
            console.error(`Error updating ${this.table}:`, err.stack);
            throw err;
        }
    }

    async delete(id) {
        const query = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;

        try {
            const res = await pool.query(query, [id]);
            return res.rows[0];
        } catch (err) {
            console.error(`Error deleting from ${this.table}:`, err.stack);
            throw err;
        }
    }
}

module.exports = BaseModel;