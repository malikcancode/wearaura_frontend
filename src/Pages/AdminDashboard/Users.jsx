import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminManagementUi from "../../Components/AdminManagementUi";

function Users() {
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        const nonAdminUsers = res.data.filter((user) => user.role !== "admin");
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      alert("Failed to delete user.");
      console.error(error);
    } finally {
      setOpenDropdown(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = (idx) => {
    setOpenDropdown((prev) => (prev === idx ? null : idx));
  };

  const handleClickOutside = () => setOpenDropdown(null);

  return (
    <div className="text-white relative">
      {openDropdown !== null && (
        <div onClick={handleClickOutside} className="fixed inset-0 z-0"></div>
      )}

      <AdminManagementUi
        heading="User Management"
        description="Manage your customers and their account settings."
        placeholder="Search users by name or email..."
        onSearch={setSearch}
      />

      <div className="bg-[#1a1a2e] rounded-lg p-4 border border-zinc-700">
        <h3 className="text-lg font-semibold mb-4">All Users</h3>

        {loading ? (
          <div className="text-center text-gray-400 py-6">Loading...</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Email Verified</th>
                {/* <th className="px-4 py-2">Joined</th> */}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-t border-zinc-700 hover:bg-[#2a2a40]"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium mb-1">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`${
                        user.isEmailVerified ? "bg-green-600" : "bg-yellow-600"
                      } text-xs px-2 py-1 rounded-full text-white`}
                    >
                      {user.isEmailVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  {/* <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td> */}
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(idx);
                      }}
                      className="text-gray-400 hover:text-purple-400"
                    >
                      <i className="bx bx-dots-horizontal-rounded text-lg"></i>
                    </button>

                    {openDropdown === idx && (
                      <div className="absolute right-0 mt-2 w-36 z-10 origin-top-right rounded-md bg-[#2a2a40] border border-zinc-700 shadow-lg">
                        <ul className="py-1 text-sm text-gray-100">
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-[#353553] block"
                              onClick={() => {
                                alert(`Edit ${user.name}`);
                                setOpenDropdown(null);
                              }}
                            >
                              Edit User
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#4b1e1e] block"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete User
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
