import {
  Copy,
  Download,
  FileIcon,
  FileText,
  Globe,
  Music,
  Trash2,
  Video,
  Image,
  Eye,
  Lock,
} from "lucide-react";
import { useState } from "react";

const FileCard = ({
  file,
  onDelete,
  onToggle,
  onDownload,
  onShareLink,
}) => {
  const [showActions, setShowActions] = useState(false);

  
  const getFileIcon = () => {
    const ext = file?.name?.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext)) {
      return <Image size={40} className="text-purple-500" />;
    }

    if (["mp4", "webm", "mov", "avi", "mkv"].includes(ext)) {
      return <Video size={40} className="text-blue-500" />;
    }

    if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext)) {
      return <Music size={40} className="text-green-500" />;
    }

    if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext)) {
      return <FileText size={40} className="text-amber-500" />;
    }

    return <FileIcon size={40} className="text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}  
      className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      {/* File Preview */}
      <div className="h-32 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        {getFileIcon()}
      </div>

      {/* Public / Private badge */}
      <div className="absolute top-2 right-2">
        <div
          className={`rounded-full p-1.5 ${
            file.isPublic ? "bg-green-100" : "bg-gray-100"
          }`}
          title={file.isPublic ? "Public" : "Private"}
        >
          {file.isPublic ? (
            <Globe size={14} className="text-green-600" />
          ) : (
            <Lock size={14} className="text-gray-600" />
          )}
        </div>
      </div>

      {/* File Info */}
      <div className="p-4">
        <h3
          title={file.name}
          className="font-medium text-gray-900 truncate"
        >
          {file.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatFileSize(file.size)} • {formatDate(file.uploadAt)}
        </p>
      </div>

      {/* Hover Actions */}
      <div
        className={`absolute inset-0 bg-black/60 flex items-end justify-center p-4 transition-opacity duration-300 ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-3">
          {file.isPublic && (
            <button
              onClick={() => onShareLink(file)}
              title="Share"
              className="p-2 bg-white rounded-full text-purple-600 hover:text-purple-800"
            >
              <Copy size={18} />
            </button>
          )}


          {file.isPublic && (
            <a
              
              target="_blank"
              rel="noreferrer"
              title="View"
              
              className="p-2 bg-white rounded-full text-gray-700 hover:text-black"
            >
              <Eye size={18} onClick={() => window.open(file.fileLocation, "_blank")} />
            </a>
          )}


          <button
            onClick={() => onDownload(file)}
            title="Download"
            className="p-2 bg-white rounded-full text-green-600 hover:text-green-800"
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => onToggle(file)}   // ✅ FIX
            title={file.isPublic ? "Make Private" : "Make Public"}
            className="p-2 bg-white rounded-full text-amber-600 hover:text-amber-800"
          >
            {file.isPublic ? <Lock size={18} /> : <Globe size={18} />}
          </button>

          <button
            onClick={() => onDelete(file.id)}
            title="Delete"
            className="p-2 bg-white rounded-full text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
