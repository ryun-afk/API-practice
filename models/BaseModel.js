const pool = require('../config/dbConfig')
const {
    buildInsertQuery,
    buildSelectQuery,
    buildUpdateQuery,
    buildDeleteQuery,
} = require('../services/QueryBuilder');


class BaseModel {

    static tableName() {
        throw `expected class ${this.constructor.name} to implement ${this.tableName.name}`
    }
    
    // CRUD methods
    static async create(data) {
        const query = buildInsertQuery(this.tableName(), data);
        try {
            const result = await pool.query(query.string, query.binds);
            return result.rows[0]; // Return the inserted row
        } catch (err) {
            console.error('Error creating record:', err);
            throw new Error('Error creating record');
        }
    }

    static async findOne(criteria) {
        const query = buildSelectQuery(this.tableName(), criteria);
        try {
            const result = await pool.query(query.string, query.binds);
            return result.rows[0]; // Return the first matching row
        } catch (err) {
            console.error('Error finding record:', err);
            throw new Error('Error finding record');
        }
    }

    static async findAll() {
        const query = buildSelectQuery(this.tableName(), {}); 
        try {
            const result = await pool.query(query.string, query.binds);
            return result.rows; // Return all rows
        } catch (err) {
            console.error('Error fetching records:', err);
            throw new Error('Error fetching records');
        }
    }

    static async update(data, criteria) {
        if (Object.keys(data).length === 0 || Object.keys(criteria).length === 0) {
            throw new Error('Data and criteria are required for updating');
        }

        const query = buildUpdateQuery(this.tableName(), data, criteria);
        try {
            const result = await pool.query(query.string, query.binds);
            return result.rowCount; // Return number of rows affected
        } catch (err) {
            console.error('Error updating record:', err);
            throw new Error('Error updating record');
        }
    }

    static async delete(criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
            throw new Error('Criteria is required for deleting');
        }

        const query = buildDeleteQuery(this.tableName(), criteria);
        try {
            const result = await pool.query(query.string, query.binds);
            return result.rowCount; // Return number of rows affected
        } catch (err) {
            console.error('Error deleting record:', err);
            throw new Error('Error deleting record');
        }
    }

}

module.exports = BaseModel