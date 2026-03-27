import {
  Copy,
  Download,
  Eye,
  File,
  Globe,
  Trash2,
  Image,
  Video,
  Music,
  FileText,
  Lock,
  Loader2,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { apiEndpoints } from "../Util/EndPoint";
import { useState } from "react";
import LinkShareModal from "./LinkShareModal";

const getFileIcon = (file) => {
  const ext = file.name?.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext))
    return <Image size={22} className="text-purple-500" />;

  if (["mp4", "webm", "mov", "avi", "mkv"].includes(ext))
    return <Video size={22} className="text-blue-500" />;

  if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext))
    return <Music size={22} className="text-green-500" />;

  if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext))
    return <FileText size={22} className="text-amber-500" />;

  return <File size={22} className="text-gray-500" />;
};



const RecentFiles = ({ files = [], refreshFiles }) => {
  const { getToken } = useAuth();

 const [deletingId, setDeletingId] = useState(null);
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    fileId: null,
    link: "",
  });

 
  const handleDownload = async (file) => {
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

 
  const togglePublic = async (file) => {
    try {
      const token = await getToken();
      await axios.patch(
        apiEndpoints.TOGGLE_FILE(file.id),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Privacy status updated");
      refreshFiles?.();
    } catch {
      toast.error("Error updating status");
    }
  };

 
  const handleDelete = async (fileId) => {
    try {
       setDeletingId(fileId);
      const token = await getToken();
      await axios.delete(apiEndpoints.DELETE_FILE(fileId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("File deleted");
      refreshFiles?.();
    } catch {
      toast.error("Delete failed");
    }
    finally{
      setDeletingId(null);
    }
  };

 
 const openShareModel = (file) => {

  const link = file.fileLocation;

  setShareModal({
    isOpen: true,
    fileId: file.id,
    link: link
  });
};
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <File size={48} className="mx-auto text-purple-300 mb-3" />
        <p className="text-gray-500">No recent files</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Recent Files</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Size</th>
              <th className="px-6 py-3 text-left">Uploaded</th>
              <th className="px-6 py-3 text-left">Sharing</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file)}
                    <span className="truncate max-w-[220px]">
                      {file.name}
                    </span>
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
                    <button
                      onClick={() => togglePublic(file)}
                      className="flex items-center gap-1"
                    >
                      {file.isPublic ? (
                        <>
                          <Globe size={14} className="text-green-500" />
                          Public
                        </>
                      ) : (
                        <>
                          <Lock size={14} className="text-gray-500" />
                          Private
                        </>
                      )}
                    </button>

                    {file.isPublic && (
                      <button
                        onClick={() => openShareModel(file)}
                        className="flex items-center gap-1 text-blue-600"
                      >
                        <Copy size={14} />
                        Share
                      </button>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <Download
                      size={18}
                      onClick={() => handleDownload(file)}
                      className="cursor-pointer text-gray-500 hover:text-green-600"
                    />
                    {deletingId === file.id ? (
  <Loader2
    size={18}
    className="animate-spin text-red-500"
  />
) : (
  <Trash2
    size={18}
    onClick={() => handleDelete(file.id)}
    className="cursor-pointer text-gray-500 hover:text-red-600"
  />
)}
                    {file.isPublic && (
                      <Eye
                        size={18}
                        className="cursor-pointer text-gray-500 hover:text-blue-600"
                        onClick={() =>
                          window.open(file.fileLocation, "_blank")
                        }
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <LinkShareModal
        isOpen={shareModal.isOpen}
        onClose={() =>
          setShareModal({ isOpen: false, fileId: null, link: "" })
        }
        link={shareModal.link}
      />
    </div>
  );
};

export default RecentFiles;