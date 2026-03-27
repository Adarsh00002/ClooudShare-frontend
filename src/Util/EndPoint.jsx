const BASE_URL = "https://cloouds0arebackend-2.onrender.com/api/v1.0";

//https://clooudsharebackend-2.onrender.com/api/v1.0/webhooks/clerk
//const BASE_URL = "http://localhost:8080/api/v1.0";

export const apiEndpoints = {
    
    GET_CREDIT: `${BASE_URL}/users/credits`,

    
    FETCH_FILES: `${BASE_URL}/files/my`,
    UPLOAD_FILE: `${BASE_URL}/files/upload`, 
    
   
    TOGGLE_FILE: (id) => `${BASE_URL}/files/${id}/toggle-public`,
    
    
    DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
    
    
    DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,

    UPDATE_CREDIT: `${BASE_URL}/payment/creditAmount`,

    FETCH_TRANSATION: `${BASE_URL}/transactions`,

   
};