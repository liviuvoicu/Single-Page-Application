import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { authClientConfig } from './config';

const authClient = new OktaAuth(authClientConfig);

const Home = () => {
    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    if (authState.isPending) return null;

    const login = async () => history.push('/login');

    const logout = async () => oktaAuth.signOut({'http://localhost:3000': window.location.origin});

    const button = authState.isAuthenticated ?
        <div align="center"><button onClick={logout}>Logout</button></div> :
        <div align="center"><button onClick={login} id="btn">Login</button></div>;
    
    // If the user is authenticated in Okta, get the AccessToken and IdToken

    var atoken = null;
    if (authState.isAuthenticated) {
    atoken = authState.accessToken.accessToken;
    } else {
    atoken = null;
    }

    var itoken = null;
    if (authState.isAuthenticated) {
    itoken = authState.idToken.idToken;
    } else {
    itoken = null;
    }

    //Decoding the IdToken

    var diHeader = null;
    var diPayload = null;
    if (authState.isAuthenticated) {
    const decodedToken = authClient.token.decode(itoken);
    
    diHeader = [decodedToken.header];
    diPayload = [decodedToken.payload];
    }

    //Decoding the AccessToken

    var daHeader = null;
    var daPayload = null;
    if (authState.isAuthenticated) {
    const decodedAToken = authClient.token.decode(atoken);
    
    daHeader = [decodedAToken.header];
    daPayload = [decodedAToken.payload];
    }


    //Show AccessToken Info after Authenticating

    if (authState.isAuthenticated) {
    var aHeader1 = daHeader.map(header => ( <p key={header.kid}>kid: {header.kid}</p>))
    var aHeader2 = daHeader.map(header => ( <p key={header.alg}>alg: {header.alg}</p>))
    };

    if (authState.isAuthenticated) {
    var aPayload1 = daPayload.map(payload => ( <p key={payload.ver}>ver: {payload.ver}</p>))
    var aPayload2 = daPayload.map(payload => ( <p key={payload.jti}>jti: {payload.jti}</p>))
    var aPayload3 = daPayload.map(payload => ( <p key={payload.iss}>iss: {payload.iss}</p>))
    var aPayload4 = daPayload.map(payload => ( <p key={payload.aud}>aud: {payload.aud}</p>))
    var aPayload5 = daPayload.map(payload => ( <p key={payload.iat}>iat: {payload.iat}</p>))
    var aPayload6 = daPayload.map(payload => ( <p key={payload.exp}>exp: {payload.exp}</p>))
    var aPayload7 = daPayload.map(payload => ( <p key={payload.cid}>cid: {payload.cid}</p>))
    var aPayload8 = daPayload.map(payload => ( <p key={payload.uid}>uid: {payload.uid}</p>))
    var aPayload9 = daPayload.map(payload => ( <p key={payload.scp}>scp: {payload.scp.toString().split(' ')}</p>))
    var aPayload10 = daPayload.map(payload => ( <p key={payload.sub}>sub: {payload.sub}</p>))
    var aPayload11 = daPayload.map(payload => ( <p key={payload.Groups}>Groups: {payload.Groups.toString().split(' ')}</p>))
    };

    //Show IdToken Info after Authenticating

    if (authState.isAuthenticated) {
    var iHeader1 = diHeader.map(header => ( <p key={header.kid}>kid: {header.kid}</p>))
    var iHeader2 = diHeader.map(header => ( <p key={header.alg}>alg: {header.alg}</p>))
    };

    if (authState.isAuthenticated) {
    var iPayload1 = diPayload.map(payload => ( <p key={payload.sub}>sub: {payload.sub}</p>))
    var iPayload2 = diPayload.map(payload => ( <p key={payload.ver}>ver: {payload.ver}</p>))
    var iPayload3 = diPayload.map(payload => ( <p key={payload.iss}>iss: {payload.iss}</p>))
    var iPayload4 = diPayload.map(payload => ( <p key={payload.aud}>aud: {payload.aud}</p>))
    var iPayload5 = diPayload.map(payload => ( <p key={payload.iat}>iat: {payload.iat}</p>))
    var iPayload6 = diPayload.map(payload => ( <p key={payload.exp}>exp: {payload.exp}</p>))
    var iPayload7 = diPayload.map(payload => ( <p key={payload.jti}>jti: {payload.jti}</p>))
    var iPayload8 = diPayload.map(payload => ( <p key={payload.amr}>amr: {payload.amr.toString().split(' ')}</p>))
    var iPayload9 = diPayload.map(payload => ( <p key={payload.idp}>idp: {payload.idp}</p>))
    var iPayload10 = diPayload.map(payload => ( <p key={payload.nonce}>nonce: {payload.nonce}</p>))
    var iPayload11 = diPayload.map(payload => ( <p key={payload.auth_time}>auth_time: {payload.auth_time}</p>))
    var iPayload12 = diPayload.map(payload => ( <p key={payload.at_hash}>at_hash: {payload.at_hash}</p>))
    };

    //Revoke Token and end session

async function revoke() {
    await authClient.revokeAccessToken(atoken);
    authClient.closeSession()
        .then(() => {
            window.location.reload();
        })
        .catch(e => {
            if (e.xhr && e.xhr.status === 429) {
            // Rate limit
            }
        })
    }

    // Table inline CSS

     var tableStyle = {display: 'none',}
     if (authState.isAuthenticated) {
     tableStyle = {display: 'table',};
     }

    //Returning data

    return (
        <div>
            {button}
            <table style={tableStyle}>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Access Token</td>
                    <td><div>{atoken}</div></td>
                </tr>
                <tr>
                    <td>ID Token</td>
                    <td>{itoken}</td>
                </tr>
                <tr>
                    <td>Refresh Token</td>
                    <td></td>
                </tr>
            </table>
            <br/><br/>
            <table style={tableStyle}>
                <tr>
                    <th>Access token content</th>
                    <th>ID token content</th>
                </tr>
                <tr>
                    <td>{aHeader1}{aHeader2}</td>
                    <td>{iHeader1}{iHeader2}</td>
                </tr>
                <tr>
                    <td>{aPayload1}{aPayload2}{aPayload3}{aPayload4}{aPayload5}{aPayload6}{aPayload7}{aPayload8}{aPayload9}{aPayload10}{aPayload11}</td>
                    <td>{iPayload1}{iPayload2}{iPayload3}{iPayload4}{iPayload5}{iPayload6}{iPayload7}{iPayload8}{iPayload9}{iPayload10}{iPayload11}{iPayload12}</td>
                </tr>
            </table>
        </div>
    );
};
export default Home