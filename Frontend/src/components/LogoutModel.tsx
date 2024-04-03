import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      if (router) {
        window.location.reload();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg w-96">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/img/logout.png"
            alt="Logout Icon"
            width={100}
            height={100}
            className="w-15 h-15 text-red-500 mb-5"
          />
          <h2 className="text-2xl font-bold">Are you sure to logout?</h2>
        </div>
        <div className="flex justify-center space-x-10">
          <button
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;