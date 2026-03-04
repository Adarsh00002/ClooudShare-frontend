import { useContext, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { userCreditContext } from "../Context/userCreditContext";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import axios from "axios";
import { apiEndpoints } from "../Util/EndPoint";
import toast from "react-hot-toast";
import UploadBox from "../Components/UploadBox";

const Uploads = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { getToken } = useAuth();
  const { credits, setCredits } = useContext(userCreditContext);

  const MAX_FILES = 5;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > MAX_FILES) {
      setMessage(`You can only upload a maximum of ${MAX_FILES} files`);
      setMessageType("error");
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select at least one file");
      setMessageType("error");
      return;
    }

    if (files.length > credits) {
      setMessage("Not enough credits");
      setMessageType("error");
      return;
    }

    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const token = await getToken();

      const response = await axios.post(
        apiEndpoints.UPLOAD_FILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.remainingCredits !== undefined) {
        setCredits(response.data.remainingCredits);
      }

      setMessage("Files uploaded successfully");
      setMessageType("success");
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
      setMessage(error.response?.data?.message || "Upload failed");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  const isUploadDisable =
    files.length === 0 ||
    files.length > MAX_FILES ||
    credits <= 0 ||
    files.length > credits;

  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : messageType === "success"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {messageType === "error" && <AlertCircle size={20} />}
            {messageType === "success" && <CheckCircle size={20} />}
            {messageType === "info" && <Info size={20} />}
            {message}
          </div>
        )}

        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          uploading={uploading}
          onRemoveFile={handleRemoveFile}
          remainingCredits={credits}
          isUploadDisable={isUploadDisable}
        />
      </div>
    </DashboardLayout>
  );
};

export default Uploads;
