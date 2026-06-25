import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  type QueryDocumentSnapshot,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2, 
  FileText, 
  FileCheck, 
  Eye, 
  Code,
  Layout
} from 'lucide-react';

interface LegalPage {
  id: string;
  title: string;
  slug: string;
  content: string;
}

const LegalPagesManagement: React.FC = () => {
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Auto-generate Slug from Title
  useEffect(() => {
    if (!editingId) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  }, [title, editingId]);

  // Fetch Legal Pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'legal_pages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: LegalPage[] = [];
      
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        data.push({ id: doc.id, ...doc.data() } as LegalPage);
      });
      
      setPages(data);
    } catch (error) {
      toast.error('Failed to fetch legal pages.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !slug || !content) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    const pageData = { title, slug, content };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'legal_pages', editingId), {
          ...pageData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Page updated successfully!');
      } else {
        await addDoc(collection(db, 'legal_pages'), {
          ...pageData,
          createdAt: serverTimestamp(),
        });
        toast.success('Page created successfully!');
      }
      resetForm();
      fetchPages();
    } catch (error) {
      toast.error('Operation failed.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      await deleteDoc(doc(db, 'legal_pages', id));
      toast.success('Deleted successfully!');
      fetchPages();
    } catch (error) {
      toast.error('Delete failed.');
    }
  };

  const handleEdit = (item: LegalPage) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setContent(item.content);
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setContent('');
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 font-['Inter']">
      <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <FileCheck className="w-6 h-6 text-blue-600" />
        Legal Pages Management
      </h1>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
            {editingId ? 'Edit Legal Page' : 'Create New Page'}
          </h2>
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'editor' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Code size={14} /> EDITOR
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Eye size={14} /> PREVIEW
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Page Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-medium"
                placeholder="e.g. Privacy Policy"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-medium"
                placeholder="privacy-policy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Content Editor (Supports HTML)</label>
            
            {viewMode === 'editor' ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-5 py-4 bg-slate-900 text-blue-100 font-mono text-sm border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none shadow-inner"
                placeholder="<p>Write your legal content here...</p>"
              />
            ) : (
              <div className="w-full min-h-[300px] p-8 bg-white border border-slate-200 rounded-2xl overflow-y-auto prose prose-slate max-w-none">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-slate-400 italic">No content to preview.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center px-8 py-3 bg-[#0F172A] text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-70 font-bold text-sm shadow-xl shadow-slate-200"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? 'UPDATE PAGE' : 'PUBLISH PAGE'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm"
              >
                CANCEL
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Pages List */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Layout className="w-5 h-5 text-blue-600" /> Published Pages
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : pages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-400 shadow-sm">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No legal pages published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((page) => (
              <div key={page.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-400 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900">{page.title}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">/{page.slug}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(page)}
                    className="p-2.5 bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                    title="Edit Page"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(page.id)}
                    className="p-2.5 bg-slate-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPagesManagement;