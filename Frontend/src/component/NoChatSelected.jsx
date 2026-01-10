import React from 'react'
import { MessageSquare } from 'lucide-react';
import "./App.css";
const NoChatSelected = () => {
  return (
  <div className="d-flex flex-column justify-content-center align-items-center w-100 vh-100 p-5 bg-light bg-opacity-50">
  <div className="text-center" style={{minHeight:"340px"}} >
    
    {/* Icon */}
    <div className="d-flex justify-content-center mb-4">
      <div
        className="d-flex justify-content-center align-items-center rounded-4"
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: "rgba(13,110,253,0.1)", // bootstrap primary
          animation: "bounceIcon  1.5s infinite"
        }}
      >
        <MessageSquare size={32} className="text-primary" />
      </div>
    </div>

    {/* Text */}
    <h2 className="fw-bold mb-2">Welcome to Chatty!</h2>
    <p className="text-muted">
      Select a conversation from the sidebar to start chatting
    </p>
  </div>
</div>

  )
}

export default NoChatSelected