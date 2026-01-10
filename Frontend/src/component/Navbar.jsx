import { Link } from "react-router-dom";
import { useAuthStore } from "../util/useAuthStore";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { useChatStore } from "../util/useChatStore";
import { useState } from "react";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { getUsers, users, setSelectedUser } = useChatStore();
  const [showUsers, setShowUsers] = useState();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom shadow-sm">
      <div className="container-fluid px-4">
        {/* LOGO */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{ width: 46, height: 26, backgroundColor: "#e7f1ff" }}
          >
            <MessageSquare size={18} className="text-primary" />
          </div>
          <strong >MyChatty</strong>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#chatNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="chatNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link to="/" className="btn btn-link text-secondary text-decoration-none">
                <Settings size={24} className="me-1" />
                <span className="d-none d-sm-inline">Settings</span>
              </Link>
            </li>

            {authUser && (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-link text-secondary text-decoration-none" >
                    <User size={24} className="me-1" />
                    <span className="d-none d-sm-inline">Profile</span>
                  </Link>
                </li>


                <li className="nav-item position-relative">
                  <button
                    onClick={() => {
                      getUsers();
                      setShowUsers((prev) => !prev);
                    }}
                    className="btn btn-link text-secondary text-decoration-none"
                  >
                    <UserPlus size={24} className="me-1" />
                    <span className="d-none d-sm-inline">Add Chat</span>
                  </button>

                  {showUsers && (
                    <ul
                      className="list-group position-absolute mt-2 shadow"
                      style={{
                        minWidth: "220px",
                        zIndex: 1000,
                      }}
                    >
                      {users.map((user) => (
                        <li
                          key={user._id}
                          className="list-group-item d-flex align-items-center"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUsers(false); // click ke baad close
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={user.profilePicture || "/avatar.png"}
                            alt={user.username}
                            className="rounded-circle me-2"
                            width={35}
                            height={35}
                          />
                          <span>{user.username}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>


                <li className="nav-item">
                  <button
                    onClick={logout}
                    style={{ border: "none" }}
                  >
                    <LogOut size={24} className="me-1" />
                    <span className="d-none d-sm-inline">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
