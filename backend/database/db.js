import mongoose from 'mongoose'

 const Connection = async(username,password) => {
    const URL = `mongodb+srv://${username}:${password}@merncluster.5km0ode.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;
    try{
     
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log('Database connected successfully');
    } catch (error) {
      console.log('Error while connecting with the database', error);
    }
}

export default Connection;