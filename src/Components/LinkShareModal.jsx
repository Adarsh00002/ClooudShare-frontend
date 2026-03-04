import { Copy, X } from "lucide-react";
import toast from "react-hot-toast";

const LinkShareModal = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X />
        </button>

        <h3 className="text-lg font-semibold mb-4">Share File</h3>

        <input
          value={link}
          readOnly
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            <Copy size={16} /> Copy Link
          </button>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 border rounded"
          >
            Open
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkShareModal;
