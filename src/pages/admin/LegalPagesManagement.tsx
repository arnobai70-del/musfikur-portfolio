import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
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
import { Plus, Edit2, Trash2, Loader2, FileText, FileCheck } from 'lucide-react';

// Import React Quill & its styles
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface LegalPage {
  id: string;
  title: string;
  slug: string;
  content: string;
}

const LegalPagesManagement = () => {
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Rich Text Editor Modules Configure
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  };

  // Generate Slug automatically from Title
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check if content is practically empty
    const plainTextContent = content.replace(/<[^>]*>?/gm, '').trim();
    if (!title || !slug || !plainTextContent) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    const pageData = {
      title,
      slug,
      content,
    };

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

  // Handle Delete
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

  // Handle Edit
  const handleEdit = (item: LegalPage) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setContent(item.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setContent('');
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <FileCheck className="w-6 h-6 text-blue-600" />
        Legal Pages Management
      </h1>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
          {editingId ? 'Edit Legal Page' : 'Create New Legal Page'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Page Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                placeholder="e.g. Privacy Policy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                placeholder="e.g. privacy-policy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Page Content *</label>
            <div className="bg-white rounded-lg border border-slate-300 overflow-hidden">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={quillModules}
                className="h-[300px] border-none"
                placeholder="Write your policy or terms here..."
              />
            </div>
          </div>

          {/* Spacer for Quill Editor height offset */}
          <div className="h-10 hidden md:block"></div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-medium"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? 'Update Page' : 'Publish Page'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Pages List */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Published Pages</h2>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500 shadow-sm">
            No legal pages found. Create your first page above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pages.map((page) => (
              <div key={page.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{page.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">/{page.slug}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(page)}
                    className="p-2 bg-slate-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit Page"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(page.id)}
                    className="p-2 bg-slate-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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