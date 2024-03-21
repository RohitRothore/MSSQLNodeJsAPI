const config = {
    server: process.env.MSSQL_SERVER,
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE_NAME,
    options: {
        trustedConnection: true,
        encrypt: false,
    },
};

module.exports = config;
