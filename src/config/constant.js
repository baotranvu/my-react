export const BASE_URL = 'https://pnl-api.reso.vn'
export  const STATUS_CODE = {
    SUCCESS: '200',
    UNAUTHORIZED: '401',
    FORBIDDEN: '403',
    NOT_FOUND: '404',
    INTERNAL_SERVER_ERROR: '500'
}

export const FIRE_BASE_CONFIG = {
    apiKey: "AIzaSyC2mg2PfUjUx5UL6SgkJkX7E5QDe09c-88",
    authDomain: "pnl-system.firebaseapp.com",
    projectId: "pnl-system",
    storageBucket: "pnl-system.appspot.com",
    messagingSenderId: "244091614547",
    appId: "1:244091614547:web:402199c5a163058456dda6",
    measurementId: "G-2BG38XFN02"
}

export const ROLE_LIST={
    ADMIN: 'Admin',
    BRAND_MANAGER: 'BrandManager',
    STORE_MANAGER: 'StoreManager',
    INVESTOR: 'Investor', 
}

export const ROLE_KEY = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"