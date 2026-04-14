import conf from "../Conf/Conf";
import { Client , Databases , ID , Storage , Query, TablesDB } from 'appwrite'

export class StoreService {
    client = new Client();
    Tables;
    Bucket;

    constructor(){
        this.client
        .setEndpoint(conf.Url)
        .setProject(conf.projectid)
        this.Tables = new TablesDB(this.client)
        this.Bucket = new Storage(this.client)
    }
    async CreatePost ({Title , slug , content , featuredImage , status , userId}) {
        try {
            return await this.Tables.createRow({
                databaseId: conf.databaseid,
                tableId: conf.tableid,
                rowId: ID.unique(),
                data: {
                    Title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async UpdatePost ($id , {Title , content , slug , featuredImage , status , userId}){
        try {
            return await this.Tables.updateRow({
                databaseId: conf.databaseid,
                tableId: conf.tableid,
                rowId:$id,
                data: {
                    Title,
                    content, 
                    slug,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async DeletePost ({$id}){
        try {
            return await this.Tables.deleteRow({
                databaseId: conf.databaseid,
                tableId: conf.tableid,
                rowId:$id
            })
        } catch (error) {
            throw error;
        }
    }
    async GetPost ({$id}){
        try {
            return await this.Tables.getRow({
                databaseId:conf.databaseid,
                tableId:conf.tableid,
                rowId:$id
            })
        } catch (error) {
            throw error;
        }
    }
    async GetPosts (){
        try {
            return await this.Tables.listRows({
                databaseId:conf.databaseid,
                tableId:conf.tableid,
                queries:[
                    Query.equal('status' , 'active')
                ]
            })
        } catch (error) {
            throw error;
        }
    }

    //file Crud services 

    async UploadFile({file}){
        try {
            return await this.Bucket.createFile({
                bucketId: conf.bucketid,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            throw error;
        }
    }
    async DeleteFile({fileId}) {
        try {
            return await this.Bucket.deleteFile({
                bucketId: conf.bucketid,
                fileId: fileId
            })
        } catch (error) {
            throw error;
        }
    }
    GetFilePreview(fileId){
        try {
            const session =  this.Bucket.getFileView({
                bucketId:conf.bucketid,
                fileId: fileId
            }).toString();
            return session
        } catch (error) {
            console.log(error)
        }
    }
}


const storeService = new StoreService()
export default storeService