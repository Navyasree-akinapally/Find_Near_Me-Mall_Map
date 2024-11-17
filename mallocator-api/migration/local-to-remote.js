const mongoose = require('mongoose')
require('dotenv').config()

const localMongoUrl = process.env.MONGO_URL
const remoteMongoUrl = process.env.REMOTE_MONGO_URL

async function migrateCollection(collectionName, localConnection, remoteConnection) {
    try {
        const localModel = localConnection.model(collectionName, new mongoose.Schema({}, { strict: false }, collectionName))
        const documents = await localModel.find({})
        console.log(`Found ${documents.length} documents in ${collectionName}`);

        if (documents.length > 0) {
            // Insert data into the remote collection
            const RemoteModel = remoteConnection.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
            await RemoteModel.insertMany(documents);
            console.log(`Migrated ${documents.length} documents from ${collectionName}`);
        }
    } catch (e) {
        console.log(`Failed to migrate collection ${collectionName}:`, e);
    }
}

async function migrateDatabase() {
    let localConnection, remoteConnection;

    try {
        // Connect to the local MongoDB database
        localConnection = await mongoose.createConnection(localMongoUrl);

        // Connect to the remote MongoDB database
        remoteConnection = mongoose.createConnection(remoteMongoUrl);
        console.log(localConnection.listDatabases);
        // Verify connections   
        if (!localConnection || !remoteConnection) {
            throw new Error("Failed to establish database connections");
        }

        // Get all collection names from the local database
        const collections = await localConnection.listCollections();
        const collectionNames = collections.map(col => col.name);

        console.log(`Collections to migrate: ${collectionNames.join(', ')}`);

        // Migrate each collection
        for (const collectionName of collectionNames) {
            await migrateCollection(collectionName, localConnection, remoteConnection);
        }

        console.log('Database migration complete.');
    } catch (error) {
        console.error('Database migration failed:', error);
    } finally {
        // Close connections
        if (localConnection) await localConnection.close();
        if (remoteConnection) await remoteConnection.close();
    }
}


migrateDatabase()