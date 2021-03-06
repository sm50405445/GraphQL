import {GraphQLServer} from 'graphql-yoga'

//Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'LSM',
    email: 'sd50712321@naver.com',
    age:27
}, {
    id: '2',
    name: 'sarah',
    email: 'sarah123@naver.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike123@naver.com'
}]

const posts = [{
    id:'1',
    title:'GraphQL 101',
    body:'body1',
    published:true,
    author:'1'
}, {
    id:'2',
    title:'title2',
    body:'body2',
    published:false,
    author:'1'
}, {
    id:'3',
    title:'title3',
    body:'body3',
    published:true,
    author:'2'
}]

const comments = [{
    id: '102',
    text: 'This worked well for me',
    author: '3',
    post:'1'
},{
    id: '103',
    text: 'Glad you enjoyed it',
    author: '1',
    post:'3'
},{
    id: '104',
    text: 'this is do not work',
    author: '2',
    post:'2'
}]

//Type definitions (schema)
const typeDefs = `
    type Query {
        users(query:String):[User!]!
        posts(query:String):[Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comment: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

//Resolver
const resolvers = {
    Query:{
        users(parent,args,ctx,info){
            if(!args.query){
                return users
            }
            return users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent,args,ctx,info){
            if(!args.query){
                return posts
            }

            return posts.filter((post)=>{
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent,args,ctx,info){
            return comments
        },
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
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find((user)=>{
                return user.id === parent.author
            })
        },
    },
    Comment:{
        author(parent,args,ctx,info){
            return users.find((user)=>{
                return user.id === parent.author
            })
        },
        post(parent,args,ctx,info){
            return posts.find((post)=>{
                return post.id === parent.post
            })
        }
    },
    User: {
        posts(parent,args,ctx,info){
            return posts.filter((post)=>{
                return post.author===parent.id
            })
        },
        comments(parent,args,ctx,info){
            // console.log('parent',parent)
            // console.log('comments',comments)
            return comments.filter((comment)=>{
                return comment.author===parent.id
            })
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