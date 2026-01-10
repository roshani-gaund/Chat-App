import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../util/useAuthStore";
import { Camera, User, Mail, X } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="container" style={{ paddingTop: "90px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 position-relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="btn btn-secoundary position-absolute top-0 end-0 m-3 rounded-circle" style={{ zIndex: 10 }}
          >
            <X size={18} />
          </button>

          {/* CARD */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">

              {/* HEADER */}
              <div className="text-center mb-4">
                <h3 className="fw-semibold">Profile</h3>
                <p className="text-muted">Your profile information</p>
              </div>

              {/* AVATAR */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={selectedImg || authUser.profilePicture || "/avatar.png"}
                    alt="Profile"
                    className="rounded-circle border"
                    width="130"
                    height="130"
                    style={{ objectFit: "cover" }}
                  />

                  <label
                    htmlFor="avatar-upload"
                    className={`position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer ${
                      isUpdatingProfile ? "opacity-50" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <Camera size={16} />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                <p className="small text-muted mt-2">
                  {isUpdatingProfile
                    ? "Uploading..."
                    : "Click the camera icon to update your photo"}
                </p>
              </div>

              {/* USER INFO */}
              <div className="mb-3">
                <label className="text-muted small d-flex align-items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <div className="form-control bg-light">
                  {authUser?.username}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted small d-flex align-items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <div className="form-control bg-light">
                  {authUser?.email}
                </div>
              </div>

              {/* ACCOUNT INFO */}
              <div className="card bg-light">
                <div className="card-body">
                  <h6 className="fw-semibold mb-3">Account Information</h6>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span className="text-muted">Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span className="text-muted">Account Status</span>
                    <span className="text-success fw-semibold">Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
