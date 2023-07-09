import { getToken, isAdmin, getUserInfo } from '../utils'

export const state = {
    isAuthenticated: getToken() ? true : false,
    isAdmin: isAdmin(),
    accountInfo: getUserInfo()
}