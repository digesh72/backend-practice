import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { ApiError } from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //files has been uploaded successfully
        //console.log("File is uploaded on cloudinary", response)
        fs.unlinkSync(localFilePath)

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove locally saved temporary file

        return null;
    }
}

const removeOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.destroy(localFilePath, {
            resource_type: "auto"
        })

        return response
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting old file.")
    }
}

export { uploadOnCloudinary, removeOnCloudinary }