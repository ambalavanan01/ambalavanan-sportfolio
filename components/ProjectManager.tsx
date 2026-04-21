import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Save, ArrowLeft } from 'lucide-react';
import { Project } from '../types';

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: 100, // starting sort ID for dynamic projects by default
    slug: '',
    title: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    techStack: '',
    description: '',
    seoDescription: '',
    problem: '',
    solution: '',
    impact: '',
    role: '',
    duration: '',
    metrics: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'dynamic_projects'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
      setProjects(projectsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setFormData({
      id: 100,
      slug: '',
      title: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      techStack: '',
      description: '',
      seoDescription: '',
      problem: '',
      solution: '',
      impact: '',
      role: '',
      duration: '',
      metrics: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (project: any) => {
    setFormData({
      id: project.id || 100,
      slug: project.slug || '',
      title: project.title || '',
      image: project.image || '',
      githubUrl: project.githubUrl || '',
      liveUrl: Array.isArray(project.liveUrl) ? project.liveUrl.join(', ') : (project.liveUrl || ''),
      techStack: project.techStack?.join(', ') || '',
      description: project.description || '',
      seoDescription: project.seoDescription || '',
      problem: project.problem || '',
      solution: project.solution || '',
      impact: project.impact || '',
      role: project.role || '',
      duration: project.duration || '',
      metrics: project.metrics?.join(', ') || ''
    });
    setIsEditing(true);
    setCurrentId(project.firebaseId);
    setView('form');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this dynamic project?')) return;
    try {
      await deleteDoc(doc(db, 'dynamic_projects', id));
      toast.success('Project deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete project.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse arrays safely
      const parsedTechStack = formData.techStack.split(',').map(s => s.trim()).filter(s => s);
      const parsedMetrics = formData.metrics.split(',').map(s => s.trim()).filter(s => s);
      const parsedLiveUrl = formData.liveUrl.includes(',') ? formData.liveUrl.split(',').map(s => s.trim()).filter(s => s) : formData.liveUrl;

      const projectData = {
        id: Number(formData.id),
        slug: formData.slug,
        title: formData.title,
        image: formData.image,
        githubUrl: formData.githubUrl,
        liveUrl: parsedLiveUrl,
        techStack: parsedTechStack,
        description: formData.description,
        seoDescription: formData.seoDescription,
        problem: formData.problem,
        solution: formData.solution,
        impact: formData.impact,
        role: formData.role,
        duration: formData.duration,
        metrics: parsedMetrics,
        updatedAt: serverTimestamp()
      };

      if (isEditing && currentId) {
        await updateDoc(doc(db, 'dynamic_projects', currentId), projectData);
        toast.success('Project updated successfully!');
      } else {
        // Use slug as the document ID for uniqueness and easy reading, or auto-generate
        const docId = formData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-');
        await setDoc(doc(db, 'dynamic_projects', docId), projectData);
        toast.success('Project created successfully!');
      }

      setView('list');
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save project.');
    }
  };

  if (view === 'form') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 space-y-8 shadow-sm studio-card">
        <div className="flex justify-between items-center border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => { setView('list'); resetForm(); }} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <ArrowLeft size={20} className="text-slate-500" />
            </button>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text uppercase tracking-tight">
              {isEditing ? 'Edit Project' : 'New Dynamic Project'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title *</label>
              <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL Slug *</label>
              <input required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" placeholder="my-new-project" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort ID (Order) *</label>
              <input required type="number" value={formData.id} onChange={e => setFormData({ ...formData, id: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image URL *</label>
              <input required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">GitHub URL *</label>
              <input required value={formData.githubUrl} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live URL (Comma separated for multiple)</label>
              <input value={formData.liveUrl} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
              <input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</label>
              <input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tech Stack (Comma Separated) *</label>
              <input required value={formData.techStack} onChange={e => setFormData({ ...formData, techStack: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" placeholder="React, Node.js, Firebase" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metrics (Comma Separated)</label>
              <input value={formData.metrics} onChange={e => setFormData({ ...formData, metrics: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" placeholder="10k+ Users, 50% Faster" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Short Description (Grid View) *</label>
              <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium min-h-[100px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO / Long Description (Detail Header) *</label>
              <textarea required value={formData.seoDescription} onChange={e => setFormData({ ...formData, seoDescription: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium min-h-[100px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Problem *</label>
              <textarea required value={formData.problem} onChange={e => setFormData({ ...formData, problem: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium min-h-[100px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Solution *</label>
              <textarea required value={formData.solution} onChange={e => setFormData({ ...formData, solution: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium min-h-[100px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Impact *</label>
              <textarea required value={formData.impact} onChange={e => setFormData({ ...formData, impact: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium min-h-[100px]" />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t border-slate-100">
             <button type="submit" className="px-8 py-3 bg-text hover:bg-primary text-white font-bold rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95">
                <Save size={16} /> {isEditing ? 'Update Project' : 'Publish Project'}
             </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 space-y-8 shadow-sm studio-card">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-100 pb-6 gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text uppercase tracking-tight">Dynamic <span className="text-primary italic">Projects</span></h2>
          <p className="text-slate-500 mt-2 text-[10px] font-bold uppercase tracking-widest">Manage additional portfolio items</p>
        </div>
        <button onClick={() => setView('form')} className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all">
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {loading ? (
         <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase animate-pulse tracking-widest">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-slate-200 rounded-[2rem]">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">No dynamic projects found.</p>
          <p className="text-slate-400 text-[10px]">Static projects from constants.ts are not displayed here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p.firebaseId} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center justify-between group transition-all hover:border-primary/20">
               <div className="flex items-center gap-6">
                 {p.image && <img src={p.image} className="w-20 h-14 object-cover rounded-lg shadow-sm border border-slate-200 hidden sm:block" alt="preview" />}
                 <div>
                   <div className="flex items-center gap-3 mb-1">
                     <span className="text-[10px] font-bold text-primary uppercase tracking-widest">ID: {p.id}</span>
                     <h3 className="font-bold text-text text-lg">{p.title}</h3>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold tracking-widest">{p.slug}</p>
                 </div>
               </div>
               <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleEdit(p)} className="p-3 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                   <Edit2 size={16} />
                 </button>
                 <button onClick={() => handleDelete(p.firebaseId)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm">
                   <Trash2 size={16} />
                 </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
