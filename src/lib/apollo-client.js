import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let client;

export function getApolloClient() {
    if (!client) {
        client = _createApolloClient();
    }
    return client;
}

export function _createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: "https://kryexthemes.com/graphql",
        }),
        cache: new InMemoryCache(),
    });
}
