function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed z-[9990] inset-0 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal