import conf from '../Conf/Conf' 
import { Client , Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.Url)
        .setProject(conf.projectid)
        this.account = new Account(this.client)
    }

    async CreateAccount ({email , password , name}){
        try {
            const userAccount = await this.account.CreateAccount(ID.unique() , email , password , name)
            if(userAccount) {
                return await this.Login({email , password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async Login ({email , password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            throw error;
        }
    }
    async GetCurrentUser (){
        try {
            return await this.account.get()
            
        } catch (error) {
            throw error;
        }
    }
    async Logout (){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice