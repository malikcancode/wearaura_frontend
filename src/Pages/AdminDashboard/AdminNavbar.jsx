import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const AdminNavbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full bg-[#2c2545] px-6 border-b border-zinc-700 py-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-white">
          {user?.name || "Admin Panel"}
        </span>
      </div>

      <div className="relative flex items-center gap-6">
        <button
          className="text-white hover:text-purple-300"
          title="Notifications"
        >
          <i className="bx bx-bell text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
