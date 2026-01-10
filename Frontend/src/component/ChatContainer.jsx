import React, { useEffect,useRef } from 'react'
import Message from "./Message.jsx";
import "./App.css";
import ChatHeader from "./Header.jsx";
import { useAuthStore } from '../util/useAuthStore';
import { useChatStore } from '../util/useChatStore';
import { formatMessageTime } from '../util/lib';
import MessageSkeleton from './MessageSkeleton.jsx';
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  // useEffect(() => {
  //   getMessages(selectedUser._id);
  //   subscribeToMessages();
  // }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // useEffect(() => {
  //   if (messageEndRef.current && messages) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });

  //   }
  // }, [messages]);

   useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>

       <Message/>
       
      </div>

    );
  }

  return (
  <div className=" chat-container d-flex flex-column  border rounded bg-light">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto p-3">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => {
            const isMe = message.senderId === authUser._id ||
            message.senderId?._id ===authUser._id;

            return (
              <div
                key={message._id}
                className={`d-flex mb-3 ${
                  isMe ? "justify-content-end" : "justify-content-start"
                }`}
              >
                {!isMe && (
                  <img
                    src={selectedUser?.profilePicture || "/avatar.png"}
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                    alt="avatar"
                  />
                )}

                <div className="max-w-75">
                  <div
                    className={`p-2 rounded ${
                      isMe ? "bg-primary text-white" : "bg-white border"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="attachment"
                        className="img-fluid rounded mb-2"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                    {message.text && <p className="mb-0">{message.text}</p>}
                  </div>

                  <small className="text-muted">
                    {formatMessageTime(message.createdAt)}
                  </small>
                </div>

                {isMe && (
                  <img
                    src={authUser.profilePicture || "/avatar.png"}
                    className="rounded-circle ms-2"
                    width="40"
                    height="40"
                    alt="avatar"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="border-top p-2 bg-white">
        <Message />
      </div>
    </div>
  )
}

export default ChatContainer