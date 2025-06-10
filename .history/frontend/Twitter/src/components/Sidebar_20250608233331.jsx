import { Home, Search, Mail, User, Twitter,Settings,MessageCircleMore  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo";




export default function Sidebar({ onSelect  }) {
  const navigate = useNavigate();

  const handleNavClick = (label) => {
 onSelect(label);
};

  return (
    <aside className="sticky top-0 h-screen w-16 sm:w-48 p-4 border-r border-gray-800 flex flex-col items-center sm:items-start space-y-6 bg-black z-10">
      <img src={logo} alt="Logo" className="" />
      <nav className="space-y-4 text-sm sm:text-base">
        {[{ icon: Home, label: "Home" }, { icon: User, label: "Profile" },{ icon: MessageCircleMore , label: "Post" }, { icon: Settings, label: "Settings" }, ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 hover:bg-gray-900 p-2 rounded-full cursor-pointer" onClick={() => handleNavClick(item.label)}>
            <item.icon className="h-5 w-5" />
            <span className="hidden sm:inline">{item.label}</span>
          </div>
        ))}
      </nav>
     

      <button
        onClick={() => {
          toast.success("Logged out successfully!");
          localStorage.removeItem("user");
          navigate("/");
        }}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:px-8 rounded-full w-full sm:w-auto ml-6 mt-56"
      >
        Logout
      </button>
    </aside>
  );
}
