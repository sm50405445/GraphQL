import {GraphQLServer} from 'graphql-yoga'

//Scalar types - String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//Resolver
const resolvers = {
    Query:{
        me(){
            return{
                id: '123921',
                name: 'LSM',
                email: 'sd50712321@naver.com',
                age: 31
            }
        },
        post(){
            return{
                id: '394921',
                title: 'love and peace',
                body: 'hi is body',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('Ther server is up!')
})