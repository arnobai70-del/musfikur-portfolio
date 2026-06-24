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
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  review: string;
  rating: number;
  image: string;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [image, setImage] = useState<string>('');

  // Fetch Testimonials from Firestore
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Testimonial[] = [];
      
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        data.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to fetch testimonials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle Cloudinary Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error('Cloudinary credentials missing in .env');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setImage(data.secure_url);
        toast.success('Profile image uploaded!');
      } else {
        toast.error('Upload failed.');
      }
    } catch (error) {
      toast.error('Error uploading image.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !position || !review || !image) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    const testimonialData = {
      name,
      position,
      review,
      rating,
      image,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), {
          ...testimonialData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Testimonial updated successfully!');
      } else {
        await addDoc(collection(db, 'testimonials'), {
          ...testimonialData,
          createdAt: serverTimestamp(),
        });
        toast.success('Testimonial added successfully!');
      }
      resetForm();
      fetchTestimonials();
    } catch (error) {
      toast.error('Operation failed.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      toast.success('Deleted successfully!');
      fetchTestimonials();
    } catch (error) {
      toast.error('Delete failed.');
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setName(item.name);
    setPosition(item.position);
    setReview(item.review);
    setRating(item.rating);
    setImage(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPosition('');
    setReview('');
    setRating(5);
    setImage('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <Quote className="w-6 h-6 text-blue-600" />
        Testimonials Management
      </h1>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Position/Company *</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="e.g. CEO at TechHub"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5) *</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image *</label>
              <div className="flex items-center gap-4">
                {image && <img src={image} alt="Avatar" className="w-10 h-10 rounded-full object-cover border" />}
                <label className="flex-1 flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin text-blue-600 mr-2" /> : <ImageIcon className="w-4 h-4 text-slate-500 mr-2" />}
                  <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Review Text *</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              placeholder="What they said about your work..."
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-medium"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? 'Update Review' : 'Save Review'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-white rounded-xl border text-slate-500">No testimonials found.</div>
        ) : (
          testimonials.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group">
              <div className="flex items-start gap-4 mb-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{item.position}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic leading-relaxed">"{item.review}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsManagement;