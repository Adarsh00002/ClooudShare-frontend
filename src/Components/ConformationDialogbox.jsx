const ConformationDialogBox = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmationButtonClose = "bg-red-600 hover:bg-red-700",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600 text-sm">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-md text-sm text-white transition ${confirmationButtonClose}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformationDialogBox;
