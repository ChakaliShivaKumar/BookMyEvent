const SignInModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
          <p className="text-gray-700 mb-6">You need to sign in to book tickets. Please log in to continue.</p>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => window.location.href = "/login"} // Redirect to login page
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignInModal;
  