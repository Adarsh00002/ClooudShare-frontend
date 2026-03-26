import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { Copy, Download, Eye, File, Globe, Grid, List, Trash2, Image, Video, Music, FileText, Lock } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import FileCard from "../Components/FileCard";
import { apiEndpoints } from "../Util/EndPoint";
import ConformationDialogBox from "../Components/ConformationDialogbox";

import LinkShareModal from "../Components/LinkShareModal";


const MyFiles = () => {
    const [files, setFiles] = useState([]);
    const [viewMode, setViewMode] = useState("list");
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [shareModel, setshareModel] = useState({
        isOpen: false,
        fileId: null,
        link: ""
    });

    const [DeleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        fileId: null
    });

  
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 12;

    const fetchFiles = useCallback(async () => {
        try {
            const token = await getToken();
            const response = await axios.get(apiEndpoints.FETCH_FILES, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setFiles(response.data);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            toast.error('Error fetching files from server');
        }
    }, [getToken]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const handleDelete = async () => {
        const fileId = DeleteConfirmation.fileId;
        console.log(DeleteConfirmation.fileId);
        if (!fileId) return;

        try {
            const token = await getToken();
            const response = await axios.delete(apiEndpoints.DELETE_FILE(fileId), {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 204 || response.status === 200) {
                setFiles(prev => prev.filter((file) => file.id !== fileId));
                closeDeleteConfirmation();
                toast.success("File deleted successfully");
            }
        } catch (error) {
            toast.error('Error deleting file');
        }
    };

  const handleDownloads = async (file) => {
    try {

        const response = await fetch(file.fileLocation);
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);

       
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();

       
        window.open(blobUrl, "_blank");

        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
        }, 5000);

    } catch (error) {
        toast.error("Download failed");
    }
};

    const togglePublic = async (fileToUpdate) => {
        try {
            const token = await getToken();
            await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id), {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFiles(prev => prev.map((f) =>
                f.id === fileToUpdate.id ? { ...f, isPublic: !f.isPublic } : f
            ));
            toast.success("Privacy status updated");
        } catch (error) {
            toast.error('Error toggling status');
        }
    };

    const openDeleteConfirmation = (fileId) => setDeleteConfirmation({ isOpen: true, fileId });
    const closeDeleteConfirmation = () => setDeleteConfirmation({ isOpen: false, fileId: null });

  const openShareModel = (file) => {
   
    const link = file.fileLocation;

    setshareModel({
        isOpen: true,
        fileId: file.id,
        link: link
    });
};
    const getFileIcon = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) return <Image size={24} className="text-purple-500" />;
        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) return <Video size={24} className="text-blue-500" />;
        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) return <Music size={24} className="text-green-500" />;
        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) return <FileText size={24} className="text-amber-500" />;
        return <File size={24} className="text-gray-500" />;
    };

   
    const totalPages = Math.ceil(files.length / filesPerPage);
    const startIndex = (currentPage - 1) * filesPerPage;
    const endIndex = startIndex + filesPerPage;
    const currentFiles = files.slice(startIndex, endIndex);

    return (
        <DashboardLayout activeMenu="My Files">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Files ({files.length})</h2>
                    <div className="flex items-center gap-3">
                        <List
                            onClick={() => setViewMode("list")}
                            size={24}
                            className={`cursor-pointer ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                        <Grid
                            onClick={() => setViewMode("grid")}
                            size={24}
                            className={`cursor-pointer ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                    </div>
                </div>

                {files.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
                        <File size={60} className="text-purple-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Files Uploaded yet</h3>
                        <button onClick={() => navigate('/upload')} className="px-4 py-2 bg-purple-500 text-white rounded-md">
                            Go to Upload
                        </button>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentFiles.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                onDelete={openDeleteConfirmation}
                                onToggle={() => togglePublic(file)}
                                onDownload={() => handleDownloads(file)}
                                onShareLink={openShareModel}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sharing</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentFiles.map((file) => (
                                    <tr key={file.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(file)}
                                                {file.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(file.uploadAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => togglePublic(file)} className="flex items-center gap-1 group">
                                                    {file.isPublic ? (
                                                        <><Globe size={14} className="text-green-500" /> Public</>
                                                    ) : (
                                                        <><Lock size={14} className="text-gray-500" /> Private</>
                                                    )}
                                                </button>
                                                {file.isPublic && (
                                                    <button onClick={() => openShareModel(file)} className="text-blue-600 flex items-center gap-1">
                                                        <Copy size={14} /> Share
                                                        
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-4">
                                                <Download size={18} className="cursor-pointer text-gray-500 hover:text-green-600" onClick={() => handleDownloads(file)} />
                                                <Trash2 size={18} className="cursor-pointer text-gray-500 hover:text-red-600" onClick={() => openDeleteConfirmation(file.id)} />
                                               {file.isPublic && 
                                                 <Eye
                                                 size={18}
                                                  className="cursor-pointer text-gray-500 hover:text-blue-600"
                                                     onClick={() => window.open(file.fileLocation, "_blank")}
                                                            />
                                               }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                       
                        <div className="flex justify-end items-center gap-4 mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className={`px-4 py-2 rounded-lg font-medium
                                  ${
                                    currentPage === 1
                                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                      : "bg-purple-600 hover:bg-purple-700 text-white"
                                  }
                                `}
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className={`px-4 py-2 rounded-lg font-medium
                                  ${
                                    currentPage === totalPages
                                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                      : "bg-purple-600 hover:bg-purple-700 text-white"
                                  }
                                `}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

               <ConformationDialogBox
                  isOpen={DeleteConfirmation.isOpen}
                  onClose={closeDeleteConfirmation}
                  title="Delete File"
                  message="Are you sure you want to delete this file?"
                  confirmText="Delete"
                  onConfirm={handleDelete}
                  confirmationButtonClose="bg-red-600 hover:bg-red-700"
                />

                <LinkShareModal
  isOpen={shareModel.isOpen}
  onClose={() =>
    setshareModel({ isOpen: false, fileId: null, link: "" })
  }
  link={shareModel.link}
/>


            </div>
        </DashboardLayout>
    );
};

export default MyFiles;
