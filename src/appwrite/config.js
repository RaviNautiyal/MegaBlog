import { Client, ID, Storage, Query, Databases } from "appwrite";
import conf from "../conf/conf.js";

export class Service{
    client  = new Client();
    databases;
    bucket;


    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID)
        this.databases  = new Databases(this.client)
        this.bucket  = new Storage(this.client)


    }

    async createPost({Title, slug, Content, FeaturedImage, Status, UserID}){
        try {
            console.log(Title, slug, Content, FeaturedImage, Status, UserID)
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    Title, Content, FeaturedImage, Status, UserID
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }


    async updatePost(slug, {Title, Content, FeaturedImage, Status}){

        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID,slug ,{
                Title, Content, FeaturedImage, Status,

            }
        )
        } 
        catch (error) {
            throw error;
            
        }
    }
    async deletePost(slug){

        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID,slug
             )
                return true
        } 
        catch (error) {
            throw error;
     
        }
    }

    async getPost(slug){

        try {
             return await this.databases.getDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID,slug)
             
            
        } 
        catch (error) {
            throw error;
               
        }
    }
    async getPosts(queries= [Query.equal("Status", "active")]){

        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseID, conf.appwriteCollectionID,queries)
          
            
        } 
        catch (error) {
            throw error;
          
        }
    }
     getMyPosts = async (UserID) => {
        try {
            // Ensure the userId is valid
            if (!UserID) {
                throw new Error('User ID is required to fetch posts');
            }
    
            // Perform the query to fetch posts by the current user
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID, conf.appwriteCollectionID,
                [
                    Query.equal('UserID', UserID)
                ]
            );
    
            // Return the documents (posts) retrieved
            return response.documents;
        } catch (error) {
            console.error('Error fetching user posts:', error.message);
            throw error;
        }
    };
    
    
    async uploadFile(File){

        try {
            return await this.bucket.createFile(conf.appwriteBucketID,ID.unique(),File)
          
            
        } 
        catch (error) {
            throw error;
      
        }
    }
    async deleteFile(FeaturedImage){

        try {
             await this.bucket.deleteFile(conf.appwriteBucketID,FeaturedImage)
          
            
        } 
        catch (error) {
            throw error;
         
        }
    }

   getFilePreview(FeaturedImage){

    console.log(this.FeaturedImage)
        return this.bucket.getFilePreview(conf.appwriteBucketID,FeaturedImage)
        
    }

     

}


const service = new Service()
export default service


