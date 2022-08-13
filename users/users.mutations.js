import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import client from "../client"


export default{
    Mutation:{
        createAccount: async (_,{firstName, lastName, username, email, password}) =>{
            try{
                     //check if username or email are already on DB
            const existingUser = await client.user.findFirst({
                where:{
                    OR: [
                        {
                            username:username,
                        },
                        {
                            email:email
                        },
                    ],
                },
            });
           if(existingUser){
            throw new Error("This username/email is already taken");
           }
            //save password

            const uglyPassword = await bcrypt.hash(password, 10);
            return client.user.create({
                data:{
                    username,
                    email,
                    firstName,
                    lastName,
                    password: uglyPassword,
                },
            });

            }catch(e){
              return e;
            }       
            //save and return the user
        },
        login: async (_, { username, password }) => {
            //find user with args.username
            const user = await client.user.findFirst({ where: { username } });
            if (!user) {
              return {
                ok: false,
                error: "User not found.",
              };
            }
            //check password with args.password
            const passwordOk = await bcrypt.compare(password,user.password);
            if(!passwordOk){
                return{
                    ok: false,
                    error:"incorrect password"
                }                
            }
            //issue a token and send it to the user
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
            return{
                ok:true,
                token,
            }
        }
    },
}