import jsonServerProvider from 'ra-data-json-server'
import { setAuthorizationToken } from "../actions/authActions"
import { SERVER_URL } from "../config"

export default jsonServerProvider(SERVER_URL, setAuthorizationToken)
