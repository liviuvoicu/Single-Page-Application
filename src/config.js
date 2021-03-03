const oktaAuthConfig = {
    
    pkce: false,
    issuer: 'https://dev-971690.okta.com/oauth2/default',
    clientId: '0oa7xzbyadbgGSUAs357',
    redirectUri: window.location.origin + '/implicit/callback',
};

const oktaSignInConfig = {
    
    baseUrl: 'https://dev-971690.okta.com',
    clientId: '0oa7xzbyadbgGSUAs357',
    redirectUri: window.location.origin + '/implicit/callback',
    authParams: {
        responseType: ["token", "id_token"],
        display: "page"
    }
};

const authClientConfig = {

    issuer: 'https://dev-971690.okta.com/oauth2/default'
};
export { oktaAuthConfig, oktaSignInConfig, authClientConfig };