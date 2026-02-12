import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle, MessageSquare } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE as string;

interface SupportMessage {
  id: number;
  client_name: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminSupportInbox: React.FC = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    const res = await fetch(`${API_BASE}/admin/support.php`);
    const data = await res.json();

    if (data.success) {
      setMessages(data.messages);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id: number) => {
    await fetch(`${API_BASE}/admin/support.php?id=${id}`, {
      method: "DELETE",
    });

    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const markResolved = async (id: number) => {
    await fetch(`${API_BASE}/admin/support.php?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Resolved" }),
    });

    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status: "Resolved" } : m
      )
    );
  };

  if (loading) return <div>Loading support messages...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-orange-500" />
        Support Inbox
      </h2>

      {messages.length === 0 && (
        <p className="text-slate-400 text-sm">No support messages.</p>
      )}

      {messages.map(msg => (
        <div
          key={msg.id}
          className="bg-white p-6 rounded-2xl border shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-bold">{msg.client_name}</p>
              <p className="text-xs text-slate-400">
                {msg.created_at}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => markResolved(msg.id)}
                className="text-emerald-500"
              >
                <CheckCircle className="w-5 h-5" />
              </button>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="font-semibold">{msg.subject}</p>
          <p className="text-xs text-orange-500 mb-2">
            {msg.category} • {msg.status}
          </p>
          <p className="text-sm text-slate-700">
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminSupportInbox;
