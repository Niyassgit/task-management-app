import React from "react";
import { useOutletContext } from "react-router-dom";
import { CheckCircle2, Plus } from "lucide-react";
import type { AdminContextType } from "../types";

const AdminUsers: React.FC = () => {
    const { users } = useOutletContext<AdminContextType>();

    return (
        <div className="max-w-7xl mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Users</h1>
                    <p className="text-slate-500 mt-2 font-medium">Team collaboration and roles</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold">No team members found yet.</p>
                    </div>
                ) : (
                    users.map(user => (
                        <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center group">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 group-hover:rotate-3 transition-transform">
                                    {user.name?.split(' ').map(n => n[0]).join('') || "?"}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                            <p className="text-sm font-semibold text-indigo-600 mb-6">{user.role}</p>

                            <div className="grid grid-cols-2 gap-3 border-t border-slate-50 pt-6">
                                <button className="py-2.5 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-600 text-xs transition-colors">Profile</button>
                                <button className="py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl font-bold text-indigo-600 text-xs transition-colors">Message</button>
                            </div>
                        </div>
                    ))
                )}

                <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-600 transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">Invite Team Member</span>
                </button>
            </div>
        </div>
    );
};

export default AdminUsers;
