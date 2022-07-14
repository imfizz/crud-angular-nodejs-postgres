const express = require('express')
const bodyParser = require("body-parser")
const { Pool } = require('pg');

const app = express()
var cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5000

// middleware
app.use(bodyParser.json())
app.use(cors());


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('error', (err, client) => {
    console.error('Unexpected Error:', err);
    process.exit(-1)
});


app.get('/person', (req, res) => { 
    ;(async () => {
      const { rows } = await pool.query('SELECT * FROM person ORDER BY id ASC')
      res.json(rows)
    })().catch(err => {
      res.json(err.stack)
    })
});

app.post('/person', (req, res) => {
    const { name, age, gender } = req.body
    ;(async () => {
        const client = await pool.connect()
        try {
            let results = await client.query(
                `INSERT INTO public.person ( name, age, gender ) VALUES ($1, $2, $3)`,
                [name, age, gender]
            )

            res.status(200).json(`Data Added Successfully`)

        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => {
        res.status(500).json({
            "code": err.code,
            "message": err.message
        });
    });
});

app.put('/person/:id', (req, res) => {
    const { name, age, gender } = req.body
    const { id } = req.params

    ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('UPDATE public.person SET name = $1, age = $2, gender = $3 WHERE id = $4', [name, age, gender, id])
            res.status(200).json(`Row Updated Successfully`)
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => {
        res.status(500).json({
            "code": err.code,
            "message": err.message
        })
    })
})

app.delete('/person/:id', (req, res) => {
    const { id } = req.params

    ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('DELETE FROM public.person WHERE id = $1', [id])
            res.status(200).json(`Row Deleted Successfully`)
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => {
        res.status(500).json({
            "code": err.code,
            "message": err.message
        })
    })
})

const server = app.listen(PORT, (res, req) => {
    console.log(`Server is running on port ${PORT}`)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server Close: Process Terminated!')
    })
})