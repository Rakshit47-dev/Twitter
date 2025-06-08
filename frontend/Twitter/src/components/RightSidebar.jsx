export default function RightSidebar() {
  return (
    <div className="hidden lg:block sticky top-0 h-screen w-80 bg-black border-l border-gray-800 z-10">
      <aside className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold text-black mb-4">Who to follow</h2>
          <ul className="space-y-4">
            {[
              { name: "Elon Musk", handle: "@elonmusk", avatar: "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" },
              { name: "Taylor Swift", handle: "@taylorswift", avatar: "https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg" }
            ].map((user, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.handle}</p>
                  </div>
                </div>
                <button className="bg-black text-white text-sm px-3 py-1 rounded-full">Follow</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mt-6">
          <h2 className="text-lg font-bold text-black mb-4">Explore Topics</h2>
          <ul className="space-y-2 text-sm text-blue-500">
            {["Technology", "Health", "Finance", "Sports"].map((topic) => (
              <li key={topic}>
                <a href={`https://en.wikipedia.org/wiki/${topic}`} className="hover:underline">
                  {topic}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
