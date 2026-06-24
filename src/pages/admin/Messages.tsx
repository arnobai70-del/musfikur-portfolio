import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc,
  type Timestamp
} from 'firebase/firestore';
import { 
  Trash2, 
  Mail, 
  Calendar, 
  MessageSquare,
  Loader2,
  Reply,
  Inbox
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp | null;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time fetching from Firestore
  useEffect(() => {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Delete function
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
      toast.success('Message deleted successfully');
    } catch (error) {
      toast.error('Error deleting message');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-blue-600" />
            Contact Messages
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage inquiries from your portfolio visitors.</p>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase mr-2 tracking-wider">Total:</span>
          <span className="text-sm font-bold text-blue-600">{messages.length}</span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 text-slate-400 rounded-full mb-4">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-slate-900 font-bold text-lg">No messages yet</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">When someone contacts you, their inquiry will show up here in real-time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm transition-all overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Sender Info - Left Column */}
                  <div className="lg:w-1/4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold">
                          {msg.fullName.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-slate-900 truncate">{msg.fullName}</h4>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                            <Mail size={12} />
                            <span className="truncate">{msg.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider pl-1">
                        <Calendar size={13} className="text-blue-500" />
                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Just now'}
                      </div>
                    </div>
                  </div>

                  {/* Message - Center Column */}
                  <div className="lg:w-3/5">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-900 font-semibold text-sm mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Subject: {msg.subject || 'N/A'}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        "{msg.message}"
                      </p>
                    </div>
                  </div>

                  {/* Actions - Right Column */}
                  <div className="flex lg:flex-col justify-end items-center gap-3 shrink-0">
                    <a 
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="flex items-center justify-center p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                      title="Reply via Email"
                    >
                      <Reply size={18} />
                    </a>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="flex items-center justify-center p-2.5 bg-white border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-100 rounded-lg transition-all"
                      title="Delete Message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;