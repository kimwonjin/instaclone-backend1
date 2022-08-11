import client from "../client";

export default {
    Mutation:{
        createMovie: (_,{title,year, genre}) =>
        client.movie.create({data:{
            title:title,
            year:year,
            genre:genre
        }}),
        deleteMovie: (_,{id}) => client.movie.delete({where:{id:id}}),
    }
} 