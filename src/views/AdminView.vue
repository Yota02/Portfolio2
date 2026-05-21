<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import Sortable from 'sortablejs';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface Project {
  id: string;
  name: string;
  folder: string;
  category: string;
  purpose: string;
  description: string;
  longDescription: string;
  context: string;
  personalContribution: string;
  duration: string;
  tags: string[];
  images: string[];
  logo: string;
  isOngoing: boolean;
  startDate: string;
  endDate: string;
  features: string[];
  links: { demo: string; github: string };
  tempLogo?: string;
  imageOrder?: string[];
}

const projects = ref<Project[]>([]);
const techs = ref<Record<string, string>>({});
const locales = ref<Record<string, any>>({});
const currentLang = ref('fr');
const loading = ref(false);
const dropActive = ref(false);
const showCropModal = ref(false);
const cropImageSrc = ref('');
let cropper: Cropper | null = null;

// UI State for collapsing/hiding zones
const showSidebar = ref(true);
const showPreview = ref(true);
const collapsedSections = ref<Record<string, boolean>>({
  baseInfo: false,
  localized: false,
  features: false,
  assets: false,
  techs: false
});

const toggleSection = (section: string) => {
  collapsedSections.value[section] = !collapsedSections.value[section];
};

const baseUrl = import.meta.env.BASE_URL;

const showTechModal = ref(false);
const editingTech = ref<string | null>(null);
const techForm = ref({ name: '', icon: '', tempIcon: '', preview: null as string | null });

const initialForm: Project = {
  id: '',
  name: '',
  folder: '',
  category: 'Dev Web',
  purpose: 'Personnel',
  description: '',
  longDescription: '',
  context: '',
  personalContribution: '',
  duration: '',
  tags: [],
  images: [],
  logo: '',
  isOngoing: false,
  startDate: '',
  endDate: '',
  features: [],
  links: { demo: '', github: '' }
};

const form = ref<Project>({ ...initialForm });
const previews = ref({ logo: null as string | null, images: [] as string[] });
const imageItems = ref<any[]>([]);
const currentImageIndex = ref(0);
const trans = ref<Record<string, any>>({});
const imageList = ref<HTMLElement | null>(null);

const getNested = (obj: any, path: string) => {
  return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
};

const setNested = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const lastObj = keys.reduce((prev, curr) => {
    if (!prev[curr]) prev[curr] = {};
    return prev[curr];
  }, obj);
  lastObj[lastKey] = value;
};

const fetchAll = async () => {
  loading.value = true;
  try {
    const [pRes, tRes, lRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/techs'),
      fetch('/api/locales')
    ]);
    projects.value = await pRes.json();
    techs.value = await tRes.json();
    locales.value = await lRes.json();

    const tempTrans: Record<string, Record<string, string>> = {};
    Object.keys(locales.value).forEach(l => tempTrans[l] = {});
    trans.value = tempTrans;

    if (projects.value.length > 0 && projects.value[0]) editProject(projects.value[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

const openTechManager = () => {
  showTechModal.value = true;
  cancelTechEdit();
};

const cancelTechEdit = () => {
  editingTech.value = null;
  techForm.value = { name: '', icon: '', tempIcon: '', preview: null };
};

const editTech = (name: string, icon: string) => {
  editingTech.value = name;
  techForm.value = { name, icon, tempIcon: '', preview: `${baseUrl}icone/${icon}` };
};

const deleteTech = async (name: string) => {
  if (!confirm(`Supprimer la technologie "${name}" ? Elle sera retirée de tous les projets.`)) return;
  const res = await fetch(`/api/techs/${name}`, { method: 'DELETE' });
  if (res.ok) {
    const data = await res.json();
    techs.value = data.techs;
    const pRes = await fetch('/api/projects');
    projects.value = await pRes.json();
  }
};

const saveTech = async () => {
  const payload = {
    name: techForm.value.name,
    icon: techForm.value.icon,
    tempIcon: techForm.value.tempIcon,
    oldName: editingTech.value
  };
  const res = await fetch('/api/techs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    techs.value = data.techs;
    cancelTechEdit();
    const pRes = await fetch('/api/projects');
    projects.value = await pRes.json();
    alert('Technologie enregistrée !');
  }
};

const onTechIconChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  techForm.value.preview = URL.createObjectURL(file);
  const fd = new FormData();
  fd.append('techIcon', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const data = await res.json();
  techForm.value.tempIcon = data.techIcon;
};

const resetForm = () => {
  form.value = JSON.parse(JSON.stringify(initialForm));
  previews.value = { logo: null, images: [] };
  imageItems.value = [];
  currentImageIndex.value = 0;
  Object.keys(locales.value).forEach(l => {
    if (!trans.value[l]) trans.value[l] = {};
  });
};

const editProject = (p: Project) => {
  form.value = JSON.parse(JSON.stringify(p));
  previews.value.logo = p.logo ? `${baseUrl}projet/${p.folder}/${p.logo}` : null;
  imageItems.value = (p.images || []).map((img, index) => ({
    id: `existing-${p.id || 'project'}-${index}-${img}`,
    type: 'existing',
    name: img,
    preview: `${baseUrl}projet/${p.folder}/${img}`
  }));
  previews.value.images = imageItems.value.map(i => i.preview);
  currentImageIndex.value = 0;
  Object.keys(locales.value).forEach(lang => {
    if (!trans.value[lang]) trans.value[lang] = {};
    (['description', 'longDescription', 'context', 'personalContribution', 'duration', 'startDate', 'endDate'] as const).forEach(field => {
      const key = p[field];
      if (key && typeof key === 'string' && key.startsWith('projects.items.')) {
        trans.value[lang]![key] = getNested(locales.value[lang], key) || '';
      }
    });
    if (p.features) {
      p.features.forEach(key => {
        if (key && key.startsWith('projects.items.')) {
          trans.value[lang]![key] = getNested(locales.value[lang], key) || '';
        }
      });
    }
  });
};

const generateKeys = () => {
  if (form.value.id) return;
  const safeName = form.value.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const base = `projects.items.${safeName}`;
  (['description', 'longDescription', 'context', 'personalContribution', 'duration', 'startDate', 'endDate'] as const).forEach(f => {
    (form.value as any)[f] = `${base}.${f}`;
    Object.keys(locales.value).forEach(lang => {
      if (!trans.value[lang]) trans.value[lang] = {};
      const key = (form.value as any)[f];
      if (!trans.value[lang]![key]) trans.value[lang]![key] = '';
    });
  });
  if (!form.value.features || !form.value.features.length) {
    const key = `${base}.features.0`;
    form.value.features = [key];
    Object.keys(locales.value).forEach(lang => {
      if (!trans.value[lang]) trans.value[lang] = {};
      if (!trans.value[lang]![key]) trans.value[lang]![key] = '';
    });
  }
};

const saveProject = async () => {
  loading.value = true;
  try {
    const payload = {
      project: {
        ...form.value,
        images: imageItems.value.filter(i => i.type === 'existing').map(i => i.name),
        imageOrder: imageItems.value.map(i => i.name)
      },
      translations: trans.value
    };
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) alert('Sauvegardé !');
    await fetchAll();
  } catch (e) {
    alert('Erreur');
  } finally {
    loading.value = false;
  }
};

const deleteProject = async (id: string) => {
  if (!confirm('Supprimer ce projet ?')) return;
  const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
  if (res.ok) await fetchAll();
};

const onLogoChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    cropImageSrc.value = ev.target?.result as string;
    showCropModal.value = true;
    nextTick(() => {
      const img = document.getElementById('cropper-img') as HTMLImageElement;
      if (cropper) cropper.destroy();
      cropper = new Cropper(img, { aspectRatio: 1, viewMode: 1 });
    });
  };
  reader.readAsDataURL(file);
};

const applyCrop = () => {
  if (!cropper) return;
  cropper.getCroppedCanvas({ width: 400, height: 400 }).toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], "logo.png", { type: "image/png" });
    previews.value.logo = URL.createObjectURL(file);
    const fd = new FormData();
    fd.append('logo', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    form.value.tempLogo = data.logo;
    showCropModal.value = false;
    cropper?.destroy();
    cropper = null;
  }, 'image/png');
};

const cancelCrop = () => {
  showCropModal.value = false;
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};

const handleFiles = async (files: FileList) => {
  const fd = new FormData();
  Array.from(files).forEach(f => fd.append('images', f));
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const data = await res.json();
  data.images.forEach((tempName: string, i: number) => {
    const file = files[i];
    if (file) {
      imageItems.value.push({
        id: `temp-${Date.now()}-${i}-${tempName}`,
        type: 'temp',
        name: tempName,
        preview: URL.createObjectURL(file)
      });
    }
  });
  previews.value.images = imageItems.value.map(it => it.preview);
  if (currentImageIndex.value >= previews.value.images.length) currentImageIndex.value = 0;
};

const onImagesDrop = (e: DragEvent) => {
  dropActive.value = false;
  if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files);
};

const onImagesChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) handleFiles(target.files);
};

const removeImage = (i: number) => {
  imageItems.value.splice(i, 1);
  previews.value.images = imageItems.value.map(it => it.preview);
  if (currentImageIndex.value >= previews.value.images.length) currentImageIndex.value = 0;
};

const techLanguageMap: Record<string, string> = {
  "Flask": "Python", "Django": "Python", "Pandas": "Python", "NumPy": "Python", "Pytorch": "Python", "TensorFlow": "Python", "Tkinter": "Python", "CustomTkinter": "Python", "Watchdog": "Python", "PyGame": "Python", "Pyinstaller": "Python", "Reinforcement Learning": "Python",
  "JavaFX": "Java", "JUnit": "Java",
  "Symfony": "PHP", "Twig": "PHP",
  "Vue.js": "JavaScript", "react": "JavaScript", "Vite": "JavaScript", "TypeScript": "JavaScript",
  "Unity": "C#"
};

const toggleTech = (n: string) => {
  const i = form.value.tags.indexOf(n);
  if (i > -1) {
    form.value.tags.splice(i, 1);
    const parent = techLanguageMap[n];
    if (parent) {
      const stillHasOtherChild = form.value.tags.some(tag => techLanguageMap[tag] === parent);
      if (!stillHasOtherChild) {
        const pIdx = form.value.tags.indexOf(parent);
        if (pIdx > -1) form.value.tags.splice(pIdx, 1);
      }
    }
  } else {
    form.value.tags.push(n);
    const parent = techLanguageMap[n];
    if (parent && !form.value.tags.includes(parent)) {
      form.value.tags.push(parent);
    }
  }
};

const addFeature = () => {
  if (!form.value.features) form.value.features = [];
  const safeName = form.value.name ? form.value.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'new-project';
  const base = `projects.items.${safeName}.features`;
  const key = `${base}.${form.value.features.length}`;
  form.value.features.push(key);
  Object.keys(locales.value).forEach(lang => {
    if (!trans.value[lang]) trans.value[lang] = {};
    if (!trans.value[lang][key]) trans.value[lang][key] = '';
  });
};

const removeFeature = (idx: number) => {
  if (!form.value.features) return;
  form.value.features.splice(idx, 1);
};

const nextImage = () => {
  if (!previews.value.images.length) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % previews.value.images.length;
};

const prevImage = () => {
  if (!previews.value.images.length) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + previews.value.images.length) % previews.value.images.length;
};

const selectImage = (idx: number) => {
  currentImageIndex.value = idx;
};

onMounted(() => {
  // Force light mode for admin
  const html = document.documentElement;
  const hadDark = html.classList.contains('dark');
  const hadLight = html.classList.contains('light');
  
  html.classList.remove('dark');
  html.classList.add('light');

  onUnmounted(() => {
    // Restore previous theme when leaving admin
    if (hadDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (hadLight) {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  });

  fetchAll();
  nextTick(() => {
    if (!imageList.value) return;
    Sortable.create(imageList.value, {
      animation: 150,
      draggable: '.sortable-item',
      handle: '.sortable-item',
      forceFallback: true,
      fallbackOnBody: true,
      onEnd: (e) => {
        if (e.oldIndex !== undefined && e.newIndex !== undefined) {
          const item = imageItems.value.splice(e.oldIndex, 1)[0];
          imageItems.value.splice(e.newIndex, 0, item);
          previews.value.images = imageItems.value.map(it => it.preview);
          if (currentImageIndex.value === e.oldIndex) currentImageIndex.value = e.newIndex;
        }
      }
    });
  });
});
</script>

<template>
  <div class="admin-container flex h-screen overflow-hidden bg-slate-50 text-slate-600 font-sans antialiased">
    
    <!-- Sidebar -->
    <div v-show="showSidebar" class="w-72 bg-white border-r border-slate-200 text-slate-500 flex flex-col h-full shadow-sm z-10 relative">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h2 class="font-extrabold uppercase text-xs tracking-widest text-slate-900">Portfolio Admin</h2>
          <p class="text-[9px] text-slate-400 tracking-wider mt-0.5 uppercase font-bold">Espace de gestion</p>
        </div>
        <button @click="resetForm" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 active:scale-95 text-white w-8 h-8 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/20 transition-all">+</button>
      </div>
      
      <!-- Project List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <div v-for="p in projects" :key="p.id" @click="editProject(p)" 
             :class="['sidebar-project-item p-4 rounded-2xl cursor-pointer group flex justify-between items-center border border-transparent transition-all shadow-sm hover:shadow-md', 
                      form.id === p.id 
                        ? 'active text-indigo-900 bg-indigo-50 font-bold border-l-4 border-l-indigo-600' 
                        : 'bg-white/50 hover:bg-white hover:text-slate-900 border-slate-100']">
          <div class="flex items-center gap-4 truncate">
            <span :class="['cat-dot', 
                           p.category === 'Dev Web' ? 'cat-web' : 
                           p.category === 'IA' ? 'cat-ia' : 
                           p.category === 'Jeux Vidéo' ? 'cat-jeux' : 'cat-logiciel']"></span>
            <div class="truncate text-sm tracking-tight">{{ p.name }}</div>
          </div>
          <button @click.stop="deleteProject(p.id)" class="opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
      
      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-slate-100 bg-white">
        <router-link to="/" class="flex items-center justify-center gap-2.5 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]">
          <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour au site
        </router-link>
      </div>
    </div>

    <!-- Main Content Area -->
    <div :class="['flex-1 flex flex-col h-full overflow-hidden transition-all duration-300', !showSidebar && 'pl-0']">
      
      <!-- Global Controls Header -->
      <div class="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center z-20 shadow-sm">
        <div class="flex items-center gap-3">
          <button @click="showSidebar = !showSidebar" 
                  :class="['p-2 rounded-xl transition-all border shadow-sm', showSidebar ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600']"
                  title="Basculer la barre latérale">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div class="h-4 w-[1px] bg-slate-200 mx-1"></div>
          <h1 class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ form.name || 'Nouveau Projet' }}</h1>
        </div>
        
        <div class="flex items-center gap-3">
          <button @click="showPreview = !showPreview" 
                  :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border shadow-sm', 
                           showPreview ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600']">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            {{ showPreview ? 'Cacher l\'aperçu' : 'Afficher l\'aperçu' }}
          </button>
          <div class="h-4 w-[1px] bg-slate-200 mx-1"></div>
          <button @click="saveProject" :disabled="loading" 
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2">
            <span v-if="loading" class="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span>
            {{ loading ? 'Enregistrement...' : 'Sauvegarder' }}
          </button>
        </div>
      </div>

      <div class="flex flex-1 overflow-hidden">
        <!-- Middle Form -->
        <div :class="['bg-slate-50 shadow-sm overflow-y-auto p-10 border-r border-slate-200 custom-scrollbar transition-all duration-300', 
                       showPreview ? 'w-[52%]' : 'w-full']">
          <header class="mb-10 flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Configuration</h1>
              <div class="flex items-center gap-4 mt-2">
                <p class="text-[11px] text-slate-500 font-mono uppercase tracking-widest bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-sm">{{ form.id || 'Nouveau Projet' }}</p>
                <div class="flex gap-1.5 bg-slate-200/60 p-1 rounded-xl border border-slate-200/80">
                  <span v-for="l in Object.keys(locales)" :key="l" @click="currentLang = l" 
                        :class="['lang-tab px-3.5 py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer', 
                                 currentLang === l ? 'bg-white text-slate-800 shadow-md' : 'text-slate-500 hover:text-slate-800']">
                    {{ l }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          </header>

          <form v-if="Object.keys(locales).length" @submit.prevent="saveProject" class="space-y-6">
            
            <!-- Section 1: Base Info -->
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300">
              <div @click="toggleSection('baseInfo')" 
                   class="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors select-none">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-widest">Informations de Base</h3>
                <svg :class="['w-5 h-5 text-slate-400 transition-transform duration-300', collapsedSections.baseInfo ? '-rotate-90' : 'rotate-0']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <div v-show="!collapsedSections.baseInfo" class="p-6 pt-0 space-y-6 border-t border-slate-50">
                <div class="grid grid-cols-2 gap-6 mt-4">
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Nom du Projet</label>
                    <input v-model="form.name" type="text" class="premium-input w-full rounded-xl p-3 border text-base outline-none" required @input="generateKeys">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Dossier Assets</label>
                    <input v-model="form.folder" type="text" class="premium-input w-full rounded-xl p-3 border text-base outline-none" required>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Catégorie</label>
                    <select v-model="form.category" class="premium-input w-full rounded-xl p-3 border text-base outline-none">
                      <option>Dev Web</option>
                      <option>IA</option>
                      <option>Jeux Vidéo</option>
                      <option>Logiciel</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contexte Objectif</label>
                    <select v-model="form.purpose" class="premium-input w-full rounded-xl p-3 border text-base outline-none">
                      <option value="Personnel">Personnel</option>
                      <option value="Éducation">Éducation</option>
                      <option value="Professionnel">Professionnel</option>
                    </select>
                  </div>
                </div>
                
                <label class="flex items-center gap-3 text-sm font-semibold text-slate-600 cursor-pointer select-none py-1">
                  <input v-model="form.isOngoing" type="checkbox" class="w-5 h-5 rounded-lg border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0">
                  En cours de développement
                </label>
              </div>
            </div>

            <!-- Section 2: Localized Contents -->
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300" v-if="trans[currentLang]">
              <div @click="toggleSection('localized')" 
                   class="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors select-none">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-widest">Textes Traduits ({{ currentLang.toUpperCase() }})</h3>
                <svg :class="['w-5 h-5 text-slate-400 transition-transform duration-300', collapsedSections.localized ? '-rotate-90' : 'rotate-0']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <div v-show="!collapsedSections.localized" class="p-6 pt-0 space-y-6 border-t border-slate-50">
                <div v-for="field in ['description', 'longDescription', 'context', 'personalContribution', 'duration', 'startDate', 'endDate']" :key="field" class="space-y-2 mt-4">
                  <div class="flex justify-between items-center">
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {{ 
                        { 
                          description: 'Description Courte', 
                          longDescription: 'Description Détaillée', 
                          context: 'Contexte du projet', 
                          personalContribution: 'Contribution Personnelle', 
                          duration: 'Durée estimée / réelle', 
                          startDate: 'Date de Début', 
                          endDate: 'Date de Fin' 
                        }[field] 
                      }}
                    </label>
                    <span class="text-[9px] text-slate-400 font-mono select-all bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{{ (form as any)[field] }}</span>
                  </div>
                  
                  <textarea v-if="['longDescription', 'context', 'personalContribution'].includes(field)" 
                            v-model="trans[currentLang][(form as any)[field]]" 
                            class="premium-input w-full rounded-xl p-4 border text-base leading-relaxed outline-none" 
                            :rows="field === 'longDescription' ? 10 : 5"></textarea>
                  <input v-else v-model="trans[currentLang][(form as any)[field]]" type="text" 
                         class="premium-input w-full rounded-xl p-3.5 border text-base outline-none">
                </div>
              </div>
            </div>

            <!-- Section 3: Features & Links -->
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300">
              <div @click="toggleSection('features')" 
                   class="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors select-none">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-widest">Caractéristiques & Liens</h3>
                <svg :class="['w-5 h-5 text-slate-400 transition-transform duration-300', collapsedSections.features ? '-rotate-90' : 'rotate-0']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <div v-show="!collapsedSections.features" class="p-6 pt-0 space-y-6 border-t border-slate-50">
                <div class="space-y-4 mt-4">
                  <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fonctionnalités clés (Features)</label>
                  <div class="space-y-3">
                    <div v-for="(feature, idx) in form.features" :key="feature + idx" class="flex items-center gap-3 group/feature">
                      <input v-if="trans[currentLang]" v-model="trans[currentLang][feature]" type="text" 
                             class="premium-input flex-1 rounded-xl p-3 border text-base outline-none" :placeholder="'Feature key: ' + feature">
                      <button type="button" @click="removeFeature(idx)" 
                              class="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                    <button type="button" @click="addFeature" 
                            class="w-full py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider hover:text-slate-800 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
                      <span class="text-lg">+</span> Ajouter une fonctionnalité
                    </button>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lien Démo Live</label>
                    <input v-model="form.links.demo" type="text" class="premium-input w-full rounded-xl p-3 border text-base outline-none" placeholder="https://...">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lien Dépôt Github</label>
                    <input v-model="form.links.github" type="text" class="premium-input w-full rounded-xl p-3 border text-base outline-none" placeholder="https://github.com/...">
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 4: Assets Media -->
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300">
              <div @click="toggleSection('assets')" 
                   class="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors select-none">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-widest">Médias & Galerie</h3>
                <svg :class="['w-5 h-5 text-slate-400 transition-transform duration-300', collapsedSections.assets ? '-rotate-90' : 'rotate-0']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <div v-show="!collapsedSections.assets" class="p-6 pt-0 space-y-6 border-t border-slate-50">
                <div class="space-y-4 mt-4">
                  <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Logo du Projet</label>
                  <div class="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shadow-inner">
                    <input type="file" @change="onLogoChange" accept="image/*" 
                           class="text-sm text-slate-500 file:mr-6 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:uppercase file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-all cursor-pointer flex-1">
                    <div class="w-16 h-16 bg-white border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                      <img v-if="previews.logo" :src="previews.logo" class="w-full h-full object-contain p-2">
                      <span v-else class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Logo</span>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Images de Galerie</label>
                  <div class="drop-zone p-10 rounded-3xl text-center cursor-pointer relative shadow-sm border-2" 
                       @dragover.prevent="dropActive = true" 
                       @dragleave.prevent="dropActive = false" 
                       @drop.prevent="onImagesDrop" 
                       @click="($refs.imagesInput as HTMLInputElement).click()" 
                       :class="{'border-indigo-400 bg-indigo-50/40': dropActive}">
                    <svg class="w-10 h-10 text-indigo-400 mx-auto mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
                    <p class="text-sm text-slate-700 font-bold">Glissez vos images ici ou cliquez pour parcourir</p>
                    <p class="text-[10px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold">Formats optimisés : PNG, JPG, WEBP</p>
                    <input type="file" multiple @change="onImagesChange" accept="image/*" class="hidden" ref="imagesInput">
                  </div>
                  
                  <div ref="imageList" class="grid grid-cols-4 gap-4 mt-6">
                    <div v-for="(item, idx) in imageItems" :key="item.id" 
                         class="sortable-item relative group cursor-move aspect-square border border-slate-200 rounded-2xl overflow-hidden shadow-md bg-white hover:border-indigo-300 transition-colors" 
                         :data-id="idx">
                      <img :src="item.preview" class="w-full h-full object-cover">
                      <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <span class="text-[10px] text-white font-black uppercase tracking-wider pointer-events-none bg-indigo-600/90 px-2 py-1 rounded-lg border border-indigo-500 shadow-lg">DÉPLACER</span>
                        <button type="button" @click.stop="removeImage(idx)" 
                                class="bg-red-600 hover:bg-red-500 p-2 rounded-xl text-white transition shadow-xl active:scale-90">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Technologies -->
            <div class="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300">
              <div @click="toggleSection('techs')" 
                   class="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors select-none">
                <h3 class="text-xs font-black text-indigo-600 uppercase tracking-widest">Technologies</h3>
                <svg :class="['w-5 h-5 text-slate-400 transition-transform duration-300', collapsedSections.techs ? '-rotate-90' : 'rotate-0']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <div v-show="!collapsedSections.techs" class="p-6 pt-0 space-y-6 border-t border-slate-50">
                <div class="flex justify-end mt-4">
                  <button type="button" @click="openTechManager" class="text-[10px] font-black text-indigo-600 uppercase hover:text-indigo-500 tracking-wider transition bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm">Gérer les Techs</button>
                </div>

                <div class="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 max-h-64 overflow-y-auto custom-scrollbar shadow-inner">
                  <span v-for="(icon, name) in techs" :key="name" @click="toggleTech(name as string)" 
                        :class="['px-3.5 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-2 shadow-sm', 
                                 form.tags.includes(name as string) 
                                   ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-200' 
                                   : 'bg-white text-slate-500 border-slate-200 hover:text-slate-700 hover:border-slate-350 hover:shadow-md']">
                    <span v-if="form.tags.includes(name as string)" class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {{ name }}
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-6 pb-10">
              <button type="submit" :disabled="loading" 
                      class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-black py-5 rounded-3xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-indigo-100 tracking-widest text-sm uppercase border border-indigo-400/20">
                {{ form.id ? 'Mettre à jour le projet' : 'Créer le nouveau projet' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Right Preview -->
        <div v-show="showPreview" class="flex-1 bg-slate-100/70 overflow-y-auto p-10 custom-scrollbar flex items-start justify-center transition-all duration-300">
          <div class="max-w-4xl w-full mx-auto preview-container min-h-[85vh] flex flex-col">
            
            <!-- Browser Mockup Frame -->
            <div class="browser-mockup rounded-2xl overflow-hidden flex flex-col flex-1 border border-slate-200 shadow-xl bg-white">
              
              <!-- Browser Header Bar -->
              <div class="browser-header px-5 py-3.5 flex items-center justify-between gap-4 select-none border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="browser-dot red"></span>
                  <span class="browser-dot yellow"></span>
                  <span class="browser-dot green"></span>
                </div>
                
                <div class="browser-address-bar flex items-center justify-center gap-1.5 truncate">
                  <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg>
                  <span>portfolio.local/project/{{ form.id || 'nouveau-projet' }}</span>
                </div>
                
                <div>
                  <router-link v-if="form.id && !form.id.startsWith('project-temp-')" 
                               :to="{ name: 'project-detail', params: { id: form.id } }" 
                               target="_blank" 
                               class="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-slate-600 hover:text-slate-800 transition flex items-center gap-1.5 shadow-sm">
                    Live
                    <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>
                  </router-link>
                </div>
              </div>
              
              <!-- Mockup View Content: Mimicking ProjectDetailView -->
              <div class="flex-1 bg-white p-12 flex flex-col overflow-y-auto custom-scrollbar">
                
                <div v-if="trans[currentLang]" class="mb-12">
                  <div class="flex items-center gap-6 mb-4 flex-wrap">
                    <h1 class="project-title-preview text-5xl">{{ form.name || 'Nom du Projet' }}</h1>
                    <span :class="['purpose-badge-preview-pro', (form.purpose || '').toLowerCase() === 'personnel' ? 'personnel' : (form.purpose || '').toLowerCase() === 'éducation' ? 'education' : 'professionnel']">
                       <svg v-if="(form.purpose || '').toLowerCase() === 'éducation'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                       <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                       {{ form.purpose || 'Personnel' }}
                    </span>
                  </div>
                  <p class="text-xl text-slate-500 italic font-medium leading-relaxed max-w-2xl">{{ trans[currentLang][form.description] || 'Aucune description courte renseignée' }}</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  <!-- Main Content Column -->
                  <div class="lg:col-span-2 space-y-12">
                    <!-- Carousel Mockup -->
                    <div class="bg-slate-50 border border-slate-200 rounded-3xl aspect-video overflow-hidden shadow-inner relative flex items-center justify-center group/carousel">
                      <img v-if="previews.images.length" :src="previews.images[currentImageIndex]" class="w-full h-full object-cover">
                      <div v-else class="text-slate-400 font-bold uppercase tracking-widest text-xs flex flex-col items-center gap-2 select-none">
                        <svg class="w-12 h-12 opacity-30" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
                        <span>Galerie vide</span>
                      </div>
                      
                      <!-- Carousel Buttons -->
                      <div v-if="previews.images.length" class="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300">
                        <button type="button" class="carousel-btn-pro shadow-lg" @click="prevImage" :disabled="previews.images.length < 2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button type="button" class="carousel-btn-pro shadow-lg" @click="nextImage" :disabled="previews.images.length < 2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>

                    <!-- Detailed sections -->
                    <div class="space-y-10" v-if="trans[currentLang]">
                      <section>
                        <h2 class="text-2xl font-extrabold text-slate-800 mb-4">{{ 'Description' }}</h2>
                        <p class="text-slate-600 text-base leading-relaxed whitespace-pre-line">{{ trans[currentLang][form.longDescription] || '...' }}</p>
                      </section>
                      
                      <section v-if="trans[currentLang][form.context]">
                        <h2 class="text-2xl font-extrabold text-slate-800 mb-4">{{ 'Contexte' }}</h2>
                        <p class="text-slate-600 text-base leading-relaxed whitespace-pre-line">{{ trans[currentLang][form.context] }}</p>
                      </section>
                      
                      <section v-if="trans[currentLang][form.personalContribution]">
                        <h2 class="text-2xl font-extrabold text-slate-800 mb-4">{{ 'Contribution' }}</h2>
                        <p class="text-slate-600 text-base leading-relaxed whitespace-pre-line">{{ trans[currentLang][form.personalContribution] }}</p>
                      </section>

                      <section>
                        <h2 class="text-2xl font-extrabold text-slate-800 mb-4">{{ 'Caractéristiques' }}</h2>
                        <ul class="space-y-4">
                          <li v-for="(feature, idx) in form.features" :key="idx" class="flex items-center gap-4 text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-indigo-600 flex-shrink-0">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{{ trans[currentLang][feature] || '...' }}</span>
                          </li>
                          <li v-if="!form.features || !form.features.length" class="text-slate-400 italic">Aucune caractéristique</li>
                        </ul>
                      </section>
                    </div>
                  </div>

                  <!-- Sidebar Column -->
                  <div class="space-y-6">
                    <!-- Tech Card -->
                    <div class="info-card-pro">
                      <h3>Technologies</h3>
                      <div class="flex flex-wrap gap-3">
                         <div v-for="tag in form.tags" :key="tag" class="w-10 h-10 bg-white border border-slate-100 rounded-xl p-2 shadow-sm flex items-center justify-center" :title="tag">
                            <img v-if="techs[tag]" :src="baseUrl + 'icone/' + techs[tag]" :alt="tag" class="w-full h-full object-contain">
                            <span v-else class="text-[8px] font-bold">{{ tag }}</span>
                         </div>
                         <span v-if="!form.tags.length" class="text-sm text-slate-400 italic">Aucune</span>
                      </div>
                    </div>

                    <!-- Duration Card -->
                    <div v-if="trans[currentLang] && trans[currentLang][form.duration]" class="info-card-pro">
                      <h3>Durée</h3>
                      <p class="text-slate-600 font-medium">{{ trans[currentLang][form.duration] }}</p>
                    </div>

                    <!-- Links Card -->
                    <div class="info-card-pro" v-if="form.links && (form.links.demo || form.links.github)">
                      <h3>Liens</h3>
                      <div class="flex flex-col gap-3">
                        <a v-if="form.links.demo" :href="form.links.demo" target="_blank" class="btn-pro btn-pro-primary">Voir la Démo</a>
                        <a v-if="form.links.github" :href="form.links.github" target="_blank" class="btn-pro btn-pro-secondary">Code Source</a>
                      </div>
                    </div>

                    <!-- Chronology Card -->
                    <div class="info-card-pro" v-if="trans[currentLang]">
                      <h3>Chronologie</h3>
                      <div class="space-y-4 text-sm">
                        <div class="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          <span class="font-bold">Début :</span> {{ trans[currentLang][form.startDate] || '—' }}
                        </div>
                        <div class="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          <span class="font-bold">Fin :</span> {{ form.isOngoing ? 'En cours' : (trans[currentLang][form.endDate] || '—') }}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tech Manager Modal -->
    <div v-if="showTechModal" class="modal-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl m-4">
        <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 class="text-lg font-black text-slate-900 uppercase tracking-tight">Gestion des Technologies</h2>
            <p class="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-bold">Ajout, Modification & Suppression</p>
          </div>
          <button @click="showTechModal = false" class="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all">&times;</button>
        </div>

        <div class="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <h3 class="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-4">{{ editingTech ? 'Modifier' : 'Ajouter' }} une Technologie</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Nom de la Technologie</label>
              <input v-model="techForm.name" type="text" placeholder="Ex: Vue.js" class="premium-input w-full rounded-xl p-2.5 border text-sm outline-none">
            </div>
            <div>
              <label class="block text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Icône (Image)</label>
              <div class="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 overflow-hidden">
                <input type="file" @change="onTechIconChange" accept="image/*" class="text-[10px] text-slate-500 file:py-1 file:px-2 file:border-0 file:rounded-md file:bg-indigo-50 file:text-[9px] file:text-indigo-600 file:font-bold file:uppercase cursor-pointer flex-1">
                <img v-if="techForm.preview" :src="techForm.preview" class="w-8 h-8 object-contain bg-slate-50 p-1 rounded-lg border border-slate-200">
              </div>
            </div>
          </div>
          <div class="flex gap-3.5 mt-5">
            <button @click="saveTech" :disabled="!techForm.name" 
                    class="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md shadow-indigo-200">
              {{ editingTech ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button v-if="editingTech" @click="cancelTechEdit" 
                    class="px-5 py-3 bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-700 font-extrabold rounded-xl text-xs uppercase tracking-widest transition">Annuler</button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          <div v-for="(icon, name) in techs" :key="name" class="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-350 transition group">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 bg-white border border-slate-200 p-1.5 rounded-xl flex items-center justify-center">
                <img :src="baseUrl + 'icone/' + icon" class="w-full h-full object-contain">
              </div>
              <span class="text-sm font-semibold text-slate-800">{{ name }}</span>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button @click="editTech(name as string, icon as string)" class="p-2 text-indigo-600 hover:text-indigo-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
              <button @click="deleteTech(name as string)" class="p-2 text-red-600 hover:text-red-700 bg-white border border-slate-200 rounded-xl hover:border-red-200 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Crop Modal -->
    <div v-if="showCropModal" class="modal-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div class="crop-container bg-white border border-slate-200 p-5 rounded-2xl max-w-[90vw] max-h-[90vh] flex flex-col shadow-xl">
        <div class="mb-4 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center" style="max-height: 55vh;">
          <img id="cropper-img" :src="cropImageSrc" class="max-w-full block">
        </div>
        <div class="flex gap-4">
          <button @click="cancelCrop" class="flex-1 px-5 py-3 bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 font-extrabold rounded-xl text-xs uppercase tracking-widest transition">Annuler</button>
          <button @click="applyCrop" class="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md shadow-indigo-200">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Force light theme variables for admin container */
.admin-container {
  --color-background: #f8fafc;
  --color-background-soft: #ffffff;
  --color-background-mute: #f1f5f9;
  --color-border: #e2e8f0;
  --color-heading: #0f172a;
  --color-text: #475569;
}

/* Scrollbar custom style */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.06);
  border-radius: 99px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}

.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

.premium-input {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  color: #1e293b !important;
  transition: all 0.2s ease-in-out;
}

.premium-input::placeholder {
  color: #94a3b8 !important;
}

.premium-input:hover {
  border-color: #cbd5e1 !important;
}

.premium-input:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  outline: none !important;
}

select.premium-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.2em 1.2em;
  padding-right: 2.5rem;
}

select.premium-input option {
  background: #ffffff !important;
  color: #1e293b !important;
}

.sidebar-project-item {
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
}

.sidebar-project-item.active {
  background: rgba(99, 102, 241, 0.05);
  border-left: 4px solid #6366f1;
}

.cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}
.cat-web { color: #3b82f6; }
.cat-ia { color: #ec4899; }
.cat-jeux { color: #10b981; }
.cat-logiciel { color: #f59e0b; }

.project-title-preview {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.browser-mockup {
  background: #ffffff;
}

.browser-header {
  background: #f8fafc;
}

.browser-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.browser-dot.red { background: #ff5f56; }
.browser-dot.yellow { background: #ffbd2e; }
.browser-dot.green { background: #27c93f; }

.browser-address-bar {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 11px;
}

.purpose-badge-preview-pro {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.purpose-badge-preview-pro.personnel {
  background-color: #ffffff;
  color: #10b981;
  border: 1px solid #10b981;
}
.purpose-badge-preview-pro.education {
  background-color: #ffffff;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}
.purpose-badge-preview-pro.professionnel {
  background-color: #ffffff;
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.info-card-pro {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.info-card-pro h3 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.btn-pro {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-decoration: none;
}
.btn-pro-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-pro-secondary {
  background-color: #0f172a;
  color: white;
}

.drop-zone {
  border: 1.5px dashed #cbd5e1;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.drop-zone:hover {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.02);
}

.carousel-btn-pro {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  transition: all 0.3s ease;
}
.carousel-btn-pro:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
}

.carousel-dot {
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.carousel-dot.active {
  width: 14px;
  background: #ffffff;
  border-radius: 99px;
}

.lang-tab {
  border: 1px solid transparent;
}
</style>
