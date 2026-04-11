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
                rowId: slug,
                data: {
                    Title,
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
    async UpdatePost (slug , {Title , content , featuredImage , status , userId}){
        try {
            return await this.Tables.updateRow({
                databaseId: conf.databaseid,
                tableId: conf.tableid,
                rowId:slug,
                data: {
                    Title,
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
    async DeletePost (slug){
        try {
            return await this.Tables.deleteRow({
                databaseId: conf.databaseid,
                tableId: conf.tableid,
                rowId:slug
            })
        } catch (error) {
            throw error;
        }
    }
    async GetPost (slug){
        try {
            return await this.Tables.getRow({
                databaseId:conf.databaseid,
                tableId:conf.tableid,
                rowId:slug
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
    async GetFilePreview({fileId}){
        try {
            return await this.Bucket.getFilePreview({
                bucketId:conf.bucketid,
                fileId:fileId
            })
        } catch (error) {
            throw error;
        }
    }
}


const storeService = new StoreService()
export default storeService