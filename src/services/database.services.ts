import { config } from 'dotenv';
import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/users.model';

config();

class DatabaseService {
	private client: MongoClient
	private db: Db
	constructor() {
		this.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING as string)
		this.db = this.client.db(process.env.MONGODB_USER_COLLECTION as string)
	}

	async connect() {
		try {
			await this.db.command({ ping: 1 })
			console.log('Pinged your deployment. You successfully connected to MongoDB!')
		} catch (error) {
			console.log('Error', error)
			throw error
		}
	}

	get users(): Collection<User> {
		return this.db.collection(process.env.MONGODB_USER_COLLECTION as string);
	}
}

const databaseService = new DatabaseService()
export default databaseService