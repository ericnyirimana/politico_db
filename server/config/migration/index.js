import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

class Setup {
    constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        this.pool.on('connect', () => {
            console.log('connected...');
        });

        this.createTables();
    }

    createTables() {
        const users = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname text,
            lastname text,
            othername text,
            email text,
            phonenumber text,
            username text,
            password text,
            passporturl text,
            isadmin boolean
        );`;

        this.pool.query(users)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });

        const parties = `
        CREATE TABLE IF NOT EXISTS party (
            id SERIAL PRIMARY KEY,
            name text,
            hqaddress text,
            logourl text
        );`;

        this.pool.query(parties)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });

        const office = `
        CREATE TABLE IF NOT EXISTS office (
            id SERIAL PRIMARY KEY,
            type text,
            name text
        );`;

        this.pool.query(office)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });

        const candidate = `
        CREATE TABLE IF NOT EXISTS candidate (
            id SERIAL PRIMARY KEY,
            office integer,
            party integer,
            candidate integer
        );`;

        this.pool.query(candidate)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });

        const votes = `
        CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            createdon date,
            createdby integer,
            office integer,
            candidate integer
        );`;

        this.pool.query(votes)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });

        const petition = `
        CREATE TABLE IF NOT EXISTS petition (
            id SERIAL PRIMARY KEY,
            createdon date,
            createdby integer,
            office integer,
            body text
        );`;

        this.pool.query(petition)
        .then((res) => {
            // console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
}

export default new Setup();