import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class Auth {
    client = new Client();
    account;

    constructor() {
        console.log('Appwrite URL:', conf.appwriteURL);
        console.log('Appwrite Project ID:', conf.appwriteProjectID);

        this.client
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectID); // Your project ID

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
          
                return userAccount;
            
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    async login({email,password }) {
        try {
            return  await this.account.createEmailPasswordSession(email, password);
           
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("User is not logged in");        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}

const authorization = new Auth();
export default authorization;
