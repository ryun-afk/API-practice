// Helper function to build INSERT query
function buildInsertQuery(tableName, data) {
    if (Object.keys(data).length === 0) {
        throw new Error('Cannot build insert query with empty data');
    }
    
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const queryString = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

    return {
        string: queryString,
        binds: values
    };
}

// Helper function to build SELECT query
function buildSelectQuery(tableName, criteria = {}) {
    if (Object.keys(criteria).length === 0) {
        return {
            string: `SELECT * FROM ${tableName}`,
            binds: []
        };
    }

    const whereClause = buildWhereClause(criteria);
    return {
        string: `SELECT * FROM ${tableName} WHERE ${whereClause}`,
        binds: Object.values(criteria)
    };
}

// Helper function to build UPDATE query
function buildUpdateQuery(tableName, data, criteria) {
    if (Object.keys(data).length === 0 || Object.keys(criteria).length === 0) {
        throw new Error('Cannot build update query with empty data or criteria');
    }

    const setClause = Object.keys(data)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    const whereClause = buildWhereClause(criteria);
    return {
        string: `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`,
        binds: [...Object.values(data), ...Object.values(criteria)]
    };
}

// Helper function to build DELETE query
function buildDeleteQuery(tableName, criteria) {
    if (Object.keys(criteria).length === 0) {
        throw new Error('Cannot build delete query with empty criteria');
    }

    const whereClause = buildWhereClause(criteria);
    return {
        string: `DELETE FROM ${tableName} WHERE ${whereClause}`,
        binds: Object.values(criteria)
    };
}

// Helper function to build WHERE clause
function buildWhereClause(criteria) {
    if (Object.keys(criteria).length === 0) {
        throw new Error('WHERE clause cannot be empty');
    }

    const conditions = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(criteria)) {
        if (typeof value === 'object' && value !== null) {
            // Handle operators (e.g., { $gt: 5 }, { $like: '%abc%' })
            if (value.$gt) {
                conditions.push(`${key} > $${paramIndex}`);
            } else if (value.$lt) {
                conditions.push(`${key} < $${paramIndex}`);
            } else if (value.$like) {
                conditions.push(`${key} LIKE $${paramIndex}`);
            } else if (value.$ne) {
                conditions.push(`${key} != $${paramIndex}`);
            } else {
                // Add other operators as needed
                throw new Error(`Unsupported operator in criteria: ${JSON.stringify(value)}`);
            }
        } else {
            conditions.push(`${key} = $${paramIndex}`);
        }
        paramIndex++;
    }

    return conditions.join(' AND ');
}

module.exports = {
    buildInsertQuery,
    buildSelectQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildWhereClause
};
