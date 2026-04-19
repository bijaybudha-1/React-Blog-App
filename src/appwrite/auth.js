import {Client, Account, ID} from 'appwrite'
import conf from '../conf/conf';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        try {
          const userAccount = await this.account.create(ID.unique, name, email, password);

          if (userAccount) {
            return this.login({email, password})
          } else {
            return userAccount
          }
        } catch (error) {
            console.log('Appwrite :: ERROR ::', error);
            
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log('Appwrite :: ERROR ::', error); 
        }
    }

    async getCurrentAccount () {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite service :: getCurrentAccount :: ERROR :', error);
            
        }

        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service :: logout :: ERROR :', error);

        }
    }
}

const authService = new AuthService();

export default authService