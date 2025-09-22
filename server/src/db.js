import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import CardRepository from './repositories/cards.js';
import FavoritesRepository from './repositories/favorites.js';
import InfoUserRepository from './repositories/infoUser.js';

dotenv.config();

let client;

async function connectDB() {
        try {
                if (!client) {
                        client = await MongoClient.connect(process.env.DB_URI, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                        });
                        const db = client.db(process.env.DB_NAME);

                        CardRepository.init(db);
                        FavoritesRepository.init(db);
                        InfoUserRepository.init(db);

                        console.log(`✅ Connected to database: ${process.env.DB_NAME}`);
                        console.log("DB_URI =", process.env.DB_URI);

                }
                return client.db(process.env.DB_NAME);
        } catch (err) {
                console.error('❌ Database connection error:', err);
                throw err;
        }
}

export default connectDB;
