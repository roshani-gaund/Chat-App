import Sidebar from "../component/Sidebar";
import { useChatStore } from "../util/useChatStore";
import NoChatSelected from "../component/NoChatSelected";
import ChatContainer from "../component/ChatContainer";

const Home = () => {
  const {selectedUser}=useChatStore();
 return(
<div className="h-screen bg-gray-100" style={{paddingTop:"50px"}}>
  <Sidebar />

  {/* Chat Area */}
  <div
    className="pt-20"
    style={{ marginLeft: "320px" }} // sidebar width
  >
    <div className="rounded-lg shadow-lg w-full h-100vh max-w-6xl mx-auto">
      <div className="h-[80vh] rounded-lg overflow-hidden bg-white">
        {selectedUser ? <ChatContainer />:<NoChatSelected />}
      </div>
    </div>
  </div>
</div>


 )
 
};

export default Home;
