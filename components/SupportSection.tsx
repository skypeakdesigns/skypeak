import React, { useState } from "react";
import { LifeBuoy, Send, Phone } from "lucide-react";
const API_BASE = import.meta.env.VITE_API_BASE as string;
const PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE;

const SupportSection: React.FC = () => {

  // ✅ State MUST be inside component
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Billing Question");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/support.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          subject,
          category,
          message
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Failed");
      }

      alert("Message sent successfully ✅");

      // Clear form
      setSubject("");
      setCategory("Billing Question");
      setMessage("");

    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">
          How can we help you today?
        </h2>
        <p className="text-slate-500">
          Search our knowledge base or reach out to your dedicated account manager.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* LEFT FORM */}
        <div className="p-10 flex-1 border-b md:border-b-0 md:border-r border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Send a Message
          </h3>

          <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Billing Question</option>
                <option>Technical Issue</option>
                <option>SEO Strategy</option>
                <option>Hosting Support</option>
              </select>

            </div>

            <textarea
              placeholder="Your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* RIGHT CONTACT */}
        <div className="p-10 bg-slate-50 md:w-80">
          <h3 className="font-bold text-slate-900 mb-6">Direct Contact</h3>

          <div className="space-y-8">

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Phone className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  Phone Support
                </p>
                <p className="font-bold text-slate-900">
                  +1 (555) 000-0000
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <LifeBuoy className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  Account Manager
                </p>
                <p className="font-bold text-slate-900">
                  Muhammad Alfaauri
                </p>
                <p className="text-xs text-orange-600 font-semibold cursor-pointer">
                  Email Muhammad
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xs text-slate-400 leading-relaxed">
                Operating Hours:
                <br />
                Mon - Fri: 9:00 AM - 6:00 PM EST
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SupportSection;
