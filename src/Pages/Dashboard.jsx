import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState, useContext, useCallback } from "react"; 
import { userCreditContext } from "../Context/userCreditContext";
import axios from "axios";
import { apiEndpoints } from "../Util/EndPoint";
import { Loader2 } from "lucide-react";
import UploadBox from "../Components/UploadBox";
import RecentFiles from "../Components/RecentFiles";


const Dashboard = () => {
    const [files, setFiles] = useState([]); 
    const [uploadFiles, setUploadFiles] = useState([]); 
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [remainingUploads, setRemainingUploads] = useState(5);

    const { getToken } = useAuth();
    const { fetchUserCredits, credits} = useContext(userCreditContext);

    const MAX_FILE = 5;

   
    const fetchRecentFiles = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await axios.get(apiEndpoints.FETCH_FILES, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

          
            const sortedFiles = res.data.sort((a, b) => 
                new Date(b.uploadAt) - new Date(a.uploadAt)
            ).slice(0, 10); 

            setFiles(sortedFiles);
        } catch (error) {
            console.error("Error fetching recent files:", error);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchRecentFiles();
    }, [fetchRecentFiles]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (uploadFiles.length + selectedFiles.length > MAX_FILE) {
            setMessage(`You can only upload a maximum of ${MAX_FILE} files`);
            setMessageType("error");
            return;
        }
        setUploadFiles(prev => [...prev, ...selectedFiles]);
    };

    const handleRemoveFiles = (index) => {
        setUploadFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (credits <= 0) {
        setMessage("No credits left. Please upgrade.");
        setMessageType("error");
        return;
    }

         if (uploadFiles.length === 0 || credits <= 0) return;

        setUploading(true);
        setMessage("Uploading...");
        setMessageType('info');

        try {
            const token = await getToken();
            console.log(token);
            const formData = new FormData();
            uploadFiles.forEach(file => formData.append('files', file));

            await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage("Uploaded successfully!");
            setMessageType('success');
            setUploadFiles([]);
            fetchRecentFiles(); 
            if (fetchUserCredits) fetchUserCredits();
        } catch (error) {
            setMessage("Upload failed");
            setMessageType('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">My Drive</h1>
                <p className="text-gray-600 mb-6">Manage your files securely</p>
                
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        messageType === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-1/3">
                        <UploadBox 
                            files={uploadFiles}
                            onFileChange={handleFileChange}
                            onUpload={handleUpload}
                            uploading={uploading}
                            onRemoveFile={handleRemoveFiles}
                            remainingCredits={credits}
                            isUploadDisable={uploading || credits <= 0 || uploadFiles.length === 0}
                        />
                    </div>

                    <div className="w-full lg:w-2/3">
                        {loading ? (
                            <div className="bg-white rounded-xl shadow p-20 flex flex-col items-center justify-center">
                                <Loader2 className="text-purple-500 animate-spin mb-2" size={40} />
                                <p className="text-gray-500">Fetching files...</p>
                            </div>
                        ) : (
                            <RecentFiles 
                                files={files} 
                                refreshFiles={fetchRecentFiles} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;