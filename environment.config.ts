import dotenv from "dotenv";

dotenv.config();
 
export default {
    confPort: process.env.PORT ?? ''
}