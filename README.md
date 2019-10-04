# Habu-meijin
This app is a simple API Gateway which can proxy both GraphQL and REST.  
However, the GraphQL server to be proxied must be Apollo Federation enabled like also:[Apollo Federation](https://blog.apollographql.com/apollo-federation-f260cf525d21)

For Example:  
- Ruby:        [apollo-federation-ruby](https://github.com/Gusto/apollo-federation-ruby)  
- JavaScript:  [federation-demo](https://github.com/apollographql/federation-demo)  
- Go:          [Apollo Federation MVP](https://github.com/99designs/gqlgen/pull/851)  

This app is based on [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter)

## How to run
It is node v8 over required.

### Use docker-compose
`docker-compose run --rm -p 3000:3000 web`  
You not need run mongodb.

### Local
```
npm install
npm run debug
```

## Develop
It is very simple.  
If you add endpoint for GraphQL, you edit `graphql/gateway.ts`.
And If you add endpoint for REST, you edit `rest/router.ts`.

If you want to write more bussiness logic, you should consider splitting the file.(e.g. models/user.ts)

