
import {ApolloServer} from "apollo-server";
import schema from "./schema";
require("dotenv").config();


const server = new ApolloServer({
    schema
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`server is running on http://localhost:${PORT}/`))