const conf = {
    Url: String(import.meta.env.VITE_APPWRITE_URL),
    projectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    tableid: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    bucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf