import { UploadCloud, Trash2, File, CheckCircle, AlertTriangle } from "lucide-react";

const UploadBox = ({
  files,
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingCredits,
  isUploadDisable,
}) => {
  return (
    // 'w-full' aur 'px-4' add kiya taaki mobile par chipke nahi
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Upload Files
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Upload your files securely. Maximum 5 files at a time.
        </p>
      </div>

      {/* Drag & Drop Area - Height responsive ki gayi hai (h-48 on mobile) */}
      <label
        htmlFor="fileUpload"
        className="relative flex flex-col items-center justify-center w-full h-48 md:h-64
        border-2 border-dashed rounded-2xl cursor-pointer transition-all
        border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 p-4"
      >
        <UploadCloud className="text-purple-600 mb-4 w-10 h-10 md:w-14 md:h-14" />

        <p className="text-sm md:text-lg text-gray-700 text-center">
          <span className="font-semibold text-purple-700">Click to upload</span> <span className="hidden sm:inline">or drag & drop</span>
        </p>

        <p className="text-xs md:text-sm text-gray-500 mt-2">
          PDF, Images, Videos, Docs
        </p>

        <input
          id="fileUpload"
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {/* File List - Overflow handle kiya gaya hai */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 border rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0"> {/* min-w-0 zaroori hai truncate ke liye */}
                <File size={20} className="text-purple-600 flex-shrink-0" />
                <div className="truncate">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button 
                onClick={() => onRemoveFile(index)}
                className="p-2 hover:bg-red-50 rounded-full transition group"
              >
                <Trash2 size={18} className="text-gray-400 group-hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer - Yahan spacing fix ki gayi hai */}
      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Credits */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          {remainingCredits > 0 ? (
            <>
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-gray-600">
                Credits: <span className="font-bold text-gray-900">{remainingCredits}</span>
              </span>
            </>
          ) : (
            <>
              <AlertTriangle size={18} className="text-red-600" />
              <span className="text-red-600 font-semibold">No credits left</span>
            </>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={onUpload}
          disabled={isUploadDisable}
          className={`
            w-full sm:w-auto  
            flex items-center justify-center gap-2
            px-8 py-3 rounded-xl
            text-sm md:text-base font-semibold text-white
            transition-all duration-200 active:scale-95
            ${isUploadDisable ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 shadow-md"}
          `}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;