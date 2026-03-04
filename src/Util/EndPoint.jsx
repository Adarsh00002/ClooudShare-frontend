const BASE_URL = "http://localhost:8080/api/v1.0";

export const apiEndpoints = {
    // User & Credits
    GET_CREDIT: `${BASE_URL}/users/credits`,

    // Files Management
    FETCH_FILES: `${BASE_URL}/files/my`,
    UPLOAD_FILE: `${BASE_URL}/files/upload`, // Missing endpoint add kiya
    
    // Dynamic Endpoints (Functions)
    // Backend @PatchMapping("/files/{id}/toggle-public") se match hona chahiye
    TOGGLE_FILE: (id) => `${BASE_URL}/files/${id}/toggle-public`,
    
    // Backend @GetMapping("/files/download/{id}")
    DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
    
    // Backend @DeleteMapping("/files/{id}")
    DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,

    UPDATE_CREDIT: `${BASE_URL}/payment/creditAmount`,

   
};