import { useAuthStore } from "../util/useAuthStore";
import { useChatStore } from "../util/useChatStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null; // ✅ crash fix

  return (
    <div className="border-bottom px-3 py-2 bg-white">
      <div className="d-flex justify-content-between align-items-center">
        
        {/* Left: User Info */}
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            <img
              src={selectedUser.profilePicture ||"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={selectedUser.username}
              width="40"
              height="40"
              className="rounded-circle object-fit-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span
                className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                style={{ width: "10px", height: "10px" }}
              />
            )}
          </div>

          {/* Name & Status */}
          <div>
            <div className="fw-semibold">{selectedUser.username}</div>
            <small className="text-muted">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </small>
          </div>
        </div>

        {/* Right: Close */}
        <button
          className="btn btn-light btn-sm"
          onClick={() => setSelectedUser(null)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
