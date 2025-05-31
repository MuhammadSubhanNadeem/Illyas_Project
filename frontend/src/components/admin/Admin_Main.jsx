import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Main_context } from "../../stores/main_store/main_store";

// const mockElectricians = [
//   {
//     id: "1",
//     name: "John Doe",
//     city: "New York",
//     experience: 5,
//     contact: "555-1234",
//   },
//   {
//     id: "2",
//     name: "Mary Johnson",
//     city: "Chicago",
//     experience: 8,
//     contact: "555-5678",
//   },
//   {
//     id: "3",
//     name: "Steve Smith",
//     city: "San Francisco",
//     experience: 3,
//     contact: "555-8765",
//   },
//   {
//     id: "4",
//     name: "Linda Brown",
//     city: "Los Angeles",
//     experience: 10,
//     contact: "555-4321",
//   },
//   {
//     id: "5",
//     name: "Robert Wilson",
//     city: "Boston",
//     experience: 7,
//     contact: "555-9876",
//   },
//   {
//     id: "6",
//     name: "Sarah Davis",
//     city: "Seattle",
//     experience: 4,
//     contact: "555-6543",
//   },
// ];

// const mockUsers = [
//   {
//     id: "1",
//     name: "Alice Green",
//     email: "alice@example.com",
//     phone: "555-1111",
//     city: "New York",
//   },
//   {
//     id: "2",
//     name: "Bob White",
//     email: "bob@example.com",
//     phone: "555-2222",
//     city: "Chicago",
//   },
//   {
//     id: "3",
//     name: "Charlie Black",
//     email: "charlie@example.com",
//     phone: "555-3333",
//     city: "San Francisco",
//   },
//   {
//     id: "4",
//     name: "Diana Blue",
//     email: "diana@example.com",
//     phone: "555-4444",
//     city: "Los Angeles",
//   },
//   {
//     id: "5",
//     name: "Edward Gray",
//     email: "edward@example.com",
//     phone: "555-5555",
//     city: "Boston",
//   },
//   {
//     id: "6",
//     name: "Fiona Red",
//     email: "fiona@example.com",
//     phone: "555-6666",
//     city: "Seattle",
//   },
// ];

export default function Admin_Main() {
  const context = useContext(Main_context);
  const [electricians, setElectricians] = useState([]);
  const [users, setUsers] = useState([]);
  const [complain, setComplain] = useState([]);
  let [totalWorkers, setTotalWorkers] = useState(0);
  let [totalUsers, setTotalUsers] = useState(0);
  const [electricianSearch, setElectricianSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [complainSearch, setComplainSearch] = useState("");

  async function allUsers() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/all-users`,
        { withCredentials: true }
      );
      console.log(response);

      if (response?.data?.success) {
        setTotalWorkers(response?.data?.workerData.length);
        setTotalUsers(response?.data?.userData.length);
        response?.data?.userData.forEach((eachUser) => {
          context.uiStates?.setUsersData((prev) => {
            return [
              ...prev,
              {
                name: eachUser?.userName,
                email: eachUser?.userEmail,
                password: eachUser?.userPassword,
                dp: eachUser?.userImageUniqueId,
              },
            ];
          });
        });

        response?.data?.workerData.forEach((eachWorker) => {
          context.uiStates?.setWorkersData((prev) => {
            return [
              ...prev,
              {
                name: eachWorker?.workerName,
                email: eachWorker?.workerEmail,
                city: eachWorker?.workerCity,
                experience: eachWorker?.workerExperience,
                contact: eachWorker?.workerContact,
              },
            ];
          });
        });
        response?.data?.complainMessages.forEach((eachMessage) => {
          context.uiStates?.setComplainData((prev) => {
            return [
              ...prev,
              {
                name: eachMessage?.userName,
                email: eachMessage?.userEmail,
                message: eachMessage?.complainMessage,
              },
            ];
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    setElectricians(context?.uiStates?.workersData);
    setUsers(context?.uiStates?.usersData);
    setComplain(context?.uiStates?.complainData);
  }, [context?.uiStates?.workersData, context?.uiStates?.usersData, context?.uiStates?.complainData]);

  const filteredElectricians = electricians.filter(
    (e) =>
      e.name.toLowerCase().includes(electricianSearch.toLowerCase()) ||
      e.city.toLowerCase().includes(electricianSearch.toLowerCase()) ||
      e.email.toLowerCase().includes(electricianSearch.toLowerCase()) ||
      e.contact.toString().toLowerCase().includes(electricianSearch.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.password.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredComplain = complain.filter(
    (u) =>
      u.name.toLowerCase().includes(complainSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(complainSearch.toLowerCase()) ||
      u.message.toLowerCase().includes(complainSearch.toLowerCase())
  );
  useEffect(() => {
    console.log(filteredUsers);
  }, [filteredUsers]);
  async function logoutHandler() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin-logout`,
        { withCredentials: true }
      );
      if (response.data.success) {
        context.uiStates.setadminAccount((prev) => {
          return {
            ...prev,
            login: false,
            user_id: "",
            user_email: "",
            user_password: "",
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="font-['Roboto'] bg-gray-100 min-h-screen font-font_family_lato">
      <header className="relative bg-blue-500 text-white py-6 text-center shadow-lg">
        <h1 className="text-2xl font-bold">
          Admin Dashboard - Electrician Platform
        </h1>
        <button type="button" className="absolute right-[50px] top-[50%] -translate-y-[50%] hover:underline cursor-pointer font-black text-[18px] decoration-2 font-font_family_lato" onClick={logoutHandler}>
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {/* Stats Section */}
        <div className="flex flex-wrap gap-6 mb-8">
          <StatCard title="Electricians Joined" count={totalWorkers} />
          <StatCard title="Users Joined" count={totalUsers} />
        </div>

        {/* Electricians Table */}
        <DataTable
          title="Electricians"
          searchPlaceholder="Search electricians by name, city..."
          searchValue={electricianSearch}
          setSearchValue={setElectricianSearch}
          headers={[
            "Name",
            "Email",
            "Location",
            "Experience (years)",
            "Contact",
          ]}
          rows={filteredElectricians.map((each) => {
            return [
              each.name,
              each.email,
              each.city,
              each.experience,
              each.contact,
            ];
          })}
        />

        {/* Users Table */}
        <DataTable
          title="Users"
          searchPlaceholder="Search users by name, email..."
          searchValue={userSearch}
          setSearchValue={setUserSearch}
          headers={["Name", "Email", "Password"]}
          //   headers={["Name", "Email", "Password", "Photo (DP)"]}
          rows={filteredUsers.map((each) => {
            return [each.name, each.email, each.password];
            // return [each.name, each.email, each.password, each.dp || "No Photo Found"];
          })}
        />
        {/* Complain Table */}
        <DataTable
          title="Complain Messages"
          searchPlaceholder="Search users by name, email..."
          searchValue={complainSearch}
          setSearchValue={setComplainSearch}
          headers={["Name", "Email", "Message"]}
          //   headers={["Name", "Email", "Password", "Photo (DP)"]}
          rows={filteredComplain.map((each) => {
            return [each.name, each.email, each.message];
            // return [each.name, each.email, each.password, each.dp || "No Photo Found"];
          })}
        />
      </main>
    </div>
  );
}

function StatCard({ title, count }) {
  return (
    <div className="bg-white rounded-lg shadow-md flex-1 min-w-[250px]">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-3xl font-bold text-blue-500">{count}</p>
      </div>
    </div>
  );
}

function DataTable({
  title,
  searchPlaceholder,
  searchValue,
  setSearchValue,
  headers,
  rows,
}) {
  console.log(rows);

  return (
    <div className="bg-white rounded-lg shadow-md mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2 sm:mb-0">
          {title}
        </h3>
        <div className="relative max-w-sm">
          <input
            type="search"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              {headers.map((h, i) => (
                <th key={i} className="text-left font-medium px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50 border-b border-gray-200"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center text-gray-400 py-6"
                >
                  Loading or No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
