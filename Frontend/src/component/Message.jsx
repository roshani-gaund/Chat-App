import React, { useRef, useState } from "react";
import { useChatStore } from "../util/useChatStore";
import toast from "react-hot-toast";
import { Image, X, Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // ✅ FIX
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="border-top p-3 sticky-bottom   bg-white">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3">
          <div className="position-relative d-inline-block">
            <img
              src={imagePreview}
              alt="preview"
              width="80"
              height="80"
              className="rounded border object-fit-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="btn btn-sm btn-light position-absolute top-0 end-0 translate-middle rounded-circle"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Message Form */}
      <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
        {/* Input */}
        <input
          type="text"
          className="form-control"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="d-none"
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`btn btn-light ${
            imagePreview ? "text-success" : "text-muted"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>

        {/* Send */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
