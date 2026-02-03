import Link from "next/link";
import { Locale } from "@/types";
import { LayoutDashboard, FolderKanban, Newspaper, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
        { icon: Newspaper, label: "News & Blog", href: "/admin/news" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-slate-800">
                    <span className="font-bold text-xl">Admin Panel</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={`/${params.lang}${item.href}`}
                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 w-full rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Admin User</span>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
}
