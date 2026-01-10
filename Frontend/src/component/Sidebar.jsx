import React from 'react'
import { useChatStore } from '../util/useChatStore';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../util/useAuthStore';
import { Loader2 } from 'lucide-react';
import { Users } from "lucide-react";
import './App.css';
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  // const sidebarUsers = users;

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
// const filteredUsers = showOnlineOnly
//   ? users.filter(u => u._id !== authUser?._id && onlineUsers.includes(u._id))
//   : users.filter(u => u._id !== authUser?._id);

  if (isUsersLoading)
    return
  (<div className="d-flex justify-content-center align-items-center vh-100">
    <Loader2 className="animate-spin" />
  </div>
  );

console.log("onlineUsers:", onlineUsers);

  return (
    <div
      className="border-end bg-light  sidebar position-fixed top-0 start-0 h-100"
      style={{
        width: "340px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,

      }}
    >
      {/* Header */}
      <div className="sidebar p-3 border-bottom d-flex align-items-center gap-2">
        <Users size={22} />
        <h6 className="mb-0 d-none d-md-block">Contacts</h6>
      </div>

      {/* Online Toggle */}
      <div className="px-3 py-2 border-bottom d-none d-md-block">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            id="onlineOnly"
          />
          <label className="form-check-label" htmlFor="onlineOnly">
            Show online only
          </label>
        </div>
        <small className="text-muted">
          {onlineUsers.length -1} online
        </small>
      </div>

      {/* Users */}
      <div
        className="overflow-auto"
        style={{ height: "calc(100vh - 140px)" }}>
        {filteredUsers.map((user) => (
          
          <div
            key={user._id}

            className={`d-flex align-items-center gap-3 px-2 px-md-3 py-2 user-select-none
              
              ${selectedUser?._id === user._id
                ? "bg-black text-white"
                : "hover-bg"
              }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedUser(user)}
          >
            {/* Avatar */}
            <div className="position-relative">
              <img
                src={
                  user.profilePicture ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={user.username}
                width="45"
                height="45"
                className="rounded-circle object-fit-cover"
              />
              {
             onlineUsers.includes(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-grow-1">
              <div className="fw-semibold text-truncate">
                {user.username}
              </div>
              <small>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </small>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">
            No online users
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar