const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-grow-1 overflow-auto p-3">
      {skeletonMessages.map((_, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`d-flex mb-4 ${
              isLeft ? "justify-content-start" : "justify-content-end"
            }`}
          >
            {/* Avatar */}
            {isLeft && (
              <div className="me-2">
                <div
                  className="rounded-circle bg-secondary bg-opacity-25"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
            )}

            {/* Message Bubble */}
            <div>
              {/* Username skeleton */}
              <div
                className="bg-secondary bg-opacity-25 rounded mb-1"
                style={{ width: "60px", height: "14px" }}
              />

              {/* Message skeleton */}
              <div
                className="bg-secondary bg-opacity-25 rounded"
                style={{ width: "200px", height: "64px" }}
              />
            </div>

            {/* Right side avatar */}
            {!isLeft && (
              <div className="ms-2">
                <div
                  className="rounded-circle bg-secondary bg-opacity-25"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
