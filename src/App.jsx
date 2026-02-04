import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, Building2, ChevronRight, Plus, Edit2, Trash2, X, LogIn, LogOut, Share2, Facebook, MessageCircle, Twitter, Linkedin } from 'lucide-react';

const App = () => {
  // ⚠️ CHANGE YOUR ADMIN CREDENTIALS HERE ⚠️
  const ADMIN_EMAIL = 'admin@jobsinkenya.co.ke';
  const ADMIN_PASSWORD = 'MySecurePassword2026!';
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareJob, setShareJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    salary: '', category: 'Technology', description: '',
    requirements: '', contact_email: ''
  });

  const categories = ['Technology', 'Marketing', 'Finance', 'Sales', 'HR', 'Design', 'Engineering', 'Healthcare', 'Education', 'Legal'];
  const locations = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega',
    'Machakos', 'Meru', 'Nyeri', 'Kericho', 'Kilifi', 'Embu', 'Kisii', 'Naivasha', 'Bungoma', 'Nyahururu',
    'Kwale', 'Voi', 'Kitui', 'Homabay', 'Migori', 'Busia', 'Siaya', 'Kajiado', 'Nanyuki', 'Muranga',
    'Kiambu', 'Kapsabet', 'Kapenguria', 'Bomet', 'Isiolo', 'Wajir', 'Mandera', 'Marsabit', 'Lodwar',
    'Tharaka-Nithi', 'Makueni', 'Nandi', 'Baringo', 'Laikipia', 'Samburu', 'Trans Nzoia', 'Uasin Gishu',
    'West Pokot', 'Taita-Taveta', 'Turkana', 'Vihiga', 'Lamu'
  ];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  useEffect(() => {
    setJobs([
      { id: 1, title: 'Software Engineer', company: 'Safaricom', location: 'Nairobi', type: 'Full-time', salary: 'KSh 150,000 - KSh 250,000', category: 'Technology', posted: '2 days ago', description: 'Build mobile solutions', requirements: 'BSc CS, 5yrs exp', contact_email: 'jobs@safaricom.co.ke' },
      { id: 2, title: 'Marketing Manager', company: 'KCB', location: 'Nairobi', type: 'Full-time', salary: 'KSh 120,000 - KSh 180,000', category: 'Marketing', posted: '1 day ago', description: 'Lead campaigns', requirements: 'Marketing degree, 3yrs exp', contact_email: 'hr@kcb.co.ke' }
    ]);
  }, []);

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setCurrentView('dashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleSubmitJob = () => {
    if (!jobForm.title || !jobForm.company || !jobForm.location || !jobForm.salary || !jobForm.description || !jobForm.requirements || !jobForm.contact_email) {
      alert('Please fill all fields');
      return;
    }
    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? { ...jobForm, id: editingJob.id, posted: job.posted } : job));
    } else {
      setJobs([{ ...jobForm, id: Date.now(), posted: 'Just now' }, ...jobs]);
    }
    setJobForm({ title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', description: '', requirements: '', contact_email: '' });
    setEditingJob(null);
    setShowJobForm(false);
  };

  const handleShareJob = (job) => {
    setShareJob(job);
    setShowShareModal(true);
  };

  const getWebsiteUrl = () => {
    return window.location.origin;
  };

  const shareToFacebook = (job) => {
    const url = getWebsiteUrl();
    const text = `${job.title} at ${job.company} - ${job.location}. Salary: ${job.salary}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToWhatsApp = (job) => {
    const url = getWebsiteUrl();
    const text = `🔥 *${job.title}* at *${job.company}*\n📍 ${job.location}\n💰 ${job.salary}\n\n${job.description}\n\nApply now: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTwitter = (job) => {
    const url = getWebsiteUrl();
    const text = `${job.title} at ${job.company} - ${job.location}. ${job.salary}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = (job) => {
    const url = getWebsiteUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyJobLink = (job) => {
    const url = getWebsiteUrl();
    const text = `${job.title} at ${job.company} - Apply now: ${url}`;
    navigator.clipboard.writeText(text);
    alert('Job link copied to clipboard!');
  };

  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share Job</h2>
          <button onClick={() => setShowShareModal(false)}><X className="w-6 h-6" /></button>
        </div>
        {shareJob && (
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">{shareJob.title}</h3>
            <p className="text-gray-600 text-sm">{shareJob.company} - {shareJob.location}</p>
          </div>
        )}
        <div className="space-y-3">
          <button onClick={() => shareJob && shareToWhatsApp(shareJob)} className="w-full flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Share on WhatsApp</span>
          </button>
          <button onClick={() => shareJob && shareToFacebook(shareJob)} className="w-full flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
            <Facebook className="w-5 h-5" />
            <span className="font-semibold">Share on Facebook</span>
          </button>
          <button onClick={() => shareJob && shareToTwitter(shareJob)} className="w-full flex items-center gap-3 bg-sky-500 text-white px-4 py-3 rounded-lg hover:bg-sky-600">
            <Twitter className="w-5 h-5" />
            <span className="font-semibold">Share on Twitter</span>
          </button>
          <button onClick={() => shareJob && shareToLinkedIn(shareJob)} className="w-full flex items-center gap-3 bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-800">
            <Linkedin className="w-5 h-5" />
            <span className="font-semibold">Share on LinkedIn</span>
          </button>
          <button onClick={() => shareJob && copyJobLink(shareJob)} className="w-full flex items-center gap-3 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700">
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (currentView === 'dashboard' && isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        {showShareModal && <ShareModal />}
        {showJobForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">{editingJob ? 'Edit' : 'Post'} Job</h2>
                <button onClick={() => { setShowJobForm(false); setEditingJob(null); }}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Job Title *" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} className="w-full border rounded px-3 py-2" />
                <input type="text" placeholder="Company *" value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} className="w-full border rounded px-3 py-2" />
                <select value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} className="w-full border rounded px-3 py-2">
                  <option value="">Select Location *</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })} className="w-full border rounded px-3 py-2">
                  {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={jobForm.category} onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })} className="w-full border rounded px-3 py-2">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Salary Range (e.g., KSh 100,000 - KSh 150,000) *" value={jobForm.salary} onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })} className="w-full border rounded px-3 py-2" />
                <textarea placeholder="Job Description *" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} className="w-full border rounded px-3 py-2" rows="4" />
                <textarea placeholder="Requirements *" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} className="w-full border rounded px-3 py-2" rows="3" />
                <input type="email" placeholder="Contact Email *" value={jobForm.contact_email} onChange={(e) => setJobForm({ ...jobForm, contact_email: e.target.value })} className="w-full border rounded px-3 py-2" />
                <button onClick={handleSubmitJob} disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400">
                  {loading ? 'Saving...' : (editingJob ? 'Update' : 'Post') + ' Job'}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white shadow p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button onClick={() => setCurrentView('home')} className="text-green-600">View Site</button>
              <button onClick={() => { setIsAdmin(false); setCurrentView('home'); }} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded shadow p-6 mb-4">
            <button onClick={() => setShowJobForm(true)} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
              <Plus className="w-5 h-5" />Post New Job
            </button>
          </div>
          <div className="bg-white rounded shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">All Job Listings ({jobs.length})</h2>
            </div>
            {jobs.map(job => (
              <div key={job.id} className="p-4 border-b flex justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} - {job.location} - {job.salary}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleShareJob(job)} className="text-green-600 hover:bg-green-50 p-2 rounded" title="Share Job"><Share2 className="w-5 h-5" /></button>
                  <button onClick={() => { setEditingJob(job); setJobForm(job); setShowJobForm(true); }} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => window.confirm('Delete?') && setJobs(jobs.filter(j => j.id !== job.id))} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {showShareModal && <ShareModal />}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <button onClick={() => setShowLogin(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)} className="w-full border rounded px-3 py-2" />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)} className="w-full border rounded px-3 py-2" />
              <button onClick={(e) => handleLogin(e)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
            </div>
          </div>
        </div>
      )}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold">Jobs in Kenya</h1>
          </div>
          <button onClick={() => setShowLogin(true)} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
            <LogIn className="w-4 h-4" />Employer Login
          </button>
        </div>
      </header>
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Find Your Dream Job in Kenya</h2>
          <p className="text-xl mb-8 text-green-100">Connect with top employers across the country</p>
          <div className="bg-white rounded-lg p-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search jobs..." className="w-full pl-10 py-3 rounded text-gray-900 border-0 focus:ring-2 focus:ring-green-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700">Search</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5" />
              <h3 className="font-bold">Filters</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full border rounded px-3 py-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select className="w-full border rounded px-3 py-2" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="all">All Locations</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold mb-2">For Employers</h3>
            <p className="text-sm text-gray-600 mb-4">Post jobs and find talent</p>
            <button onClick={() => setShowLogin(true)} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Post a Job</button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{filteredJobs.length} Jobs Found</h2>
            <p className="text-gray-600">Browse opportunities below</p>
          </div>
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{job.type}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.posted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{job.category}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleShareJob(job)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      <Share2 className="w-4 h-4" />Share
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                      Apply Now<ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-6 h-6" />
            <span className="font-bold text-lg">Jobs in Kenya</span>
          </div>
          <p className="text-gray-400">&copy; 2026 Jobs in Kenya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;