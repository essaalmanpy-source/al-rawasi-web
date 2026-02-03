export default function AdminDashboardPage() {
    const stats = [
        { label: "Total Projects", value: "24", change: "+2 this month" },
        { label: "Blog Posts", value: "12", change: "+1 this week" },
        { label: "Messages", value: "5", change: "3 unread" },
        { label: "Downloads", value: "156", change: "+12%" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {stat.change}
                    </span>
                </div>
            ))}

            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h3 className="font-bold text-gray-800 mb-4">Recent Projects</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <p className="font-semibold text-gray-800">Project Name {i}</p>
                                    <p className="text-xs text-gray-500">Infrastructure</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
