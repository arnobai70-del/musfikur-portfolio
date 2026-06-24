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
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2, Globe, Code } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [technologies, setTechnologies] = useState<string>('');
  const [liveLink, setLiveLink] = useState<string>('');
  const [githubLink, setGithubLink] = useState<string>('');

  // Fetch Projects from Firestore
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const projectsData: Project[] = [];
      
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      
      setProjects(projectsData);
    } catch (error) {
      toast.error('Failed to fetch projects.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
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
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed.');
      }
    } catch (error) {
      toast.error('Error uploading image.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submit (Create & Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image || !technologies) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    const projectData = {
      title,
      description,
      image,
      technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      liveLink,
      githubLink,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          ...projectData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Project updated successfully!');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        toast.success('Project added successfully!');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(editingId ? 'Failed to update project.' : 'Failed to add project.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project.');
      console.error(error);
    }
  };

  // Populate form for editing
  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image);
    setTechnologies(project.technologies.join(', '));
    setLiveLink(project.liveLink || '');
    setGithubLink(project.githubLink || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImage('');
    setTechnologies('');
    setLiveLink('');
    setGithubLink('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Projects Management</h1>
      </div>

      {/* Project Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Yasin Books"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Technologies * (Comma separated)</label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="e.g. React, Node.js, Firebase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Live Demo URL</label>
              <input
                type="url"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Repository URL</label>
              <input
                type="url"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Project Image * (Cloudinary)</label>
            <div className="flex items-center gap-4">
              {image && (
                <img src={image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
              )}
              <div className="flex-1">
                <label className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-slate-500 mr-2" />
                  )}
                  <span className="text-slate-700 font-medium">{uploading ? 'Uploading...' : 'Choose Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? 'Update Project' : 'Save Project'}
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

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Existing Projects</h2>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
            No projects found. Add your first project above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden bg-slate-100 relative group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        <Globe className="w-4 h-4 mr-1" /> Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        <Code className="w-4 h-4 mr-1" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;