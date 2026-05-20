<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue';
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
const trans = ref<Record<string, Record<string, string>>>({});
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

    if (projects.value.length) editProject(projects.value[0]);
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
        trans.value[lang][key] = getNested(locales.value[lang], key) || '';
      }
    });
    if (p.features) {
      p.features.forEach(key => {
        if (key && key.startsWith('projects.items.')) {
          trans.value[lang][key] = getNested(locales.value[lang], key) || '';
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
      if (!trans.value[lang][(form.value as any)[f]]) trans.value[lang][(form.value as any)[f]] = '';
    });
  });
  if (!form.value.features || !form.value.features.length) {
    form.value.features = [`${base}.features.0`];
    Object.keys(locales.value).forEach(lang => {
      if (!trans.value[lang][form.value.features[0]]) trans.value[lang][form.value.features[0]] = '';
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
    imageItems.value.push({
      id: `temp-${Date.now()}-${i}-${tempName}`,
      type: 'temp',
      name: tempName,
      preview: URL.createObjectURL(files[i])
    });
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

const toggleTech = (n: string) => {
  const i = form.value.tags.indexOf(n);
  if (i > -1) form.value.tags.splice(i, 1);
  else form.value.tags.push(n);
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
  <div class="flex h-screen overflow-hidden bg-slate-50 text-slate-700 font-sans">
    
    <!-- Sidebar -->
    <div class="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl z-10">
      <div class="p-5 border-b border-slate-800 flex justify-between items-center">
        <h2 class="font-bold uppercase text-xs tracking-widest text-white">Portfolio Admin</h2>
        <button @click="resetForm" class="bg-blue-600 hover:bg-blue-700 p-1 px-3 rounded-full text-white text-sm font-bold shadow-lg transition">+</button>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="p in projects" :key="p.id" @click="editProject(p)" :class="['p-4 border-b border-slate-800 cursor-pointer group flex justify-between items-center hover:bg-slate-800 transition', form.id === p.id ? 'bg-slate-800 border-l-4 border-l-blue-500 text-white' : '']">
          <div class="truncate pr-2 text-sm">{{ p.name }}</div>
          <button @click.stop="deleteProject(p.id)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
      <div class="p-4 border-t border-slate-800">
        <router-link to="/" class="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour au site
        </router-link>
      </div>
    </div>

    <!-- Middle Form -->
    <div class="w-2/5 bg-white shadow-xl overflow-y-auto p-8 border-r">
      <header class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Configuration</h1>
          <div class="flex items-center gap-4 mt-1">
            <p class="text-xs text-slate-400 font-mono uppercase tracking-tighter">{{ form.id || 'Nouveau Projet' }}</p>
            <div class="flex gap-1">
              <span v-for="l in Object.keys(locales)" :key="l" @click="currentLang = l" :class="['lang-tab', currentLang === l ? 'active' : '']">{{ l.toUpperCase() }}</span>
            </div>
          </div>
        </div>
        <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </header>

      <form v-if="Object.keys(locales).length" @submit.prevent="saveProject" class="space-y-6">
        <div class="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Nom du Projet</label>
              <input v-model="form.name" type="text" class="w-full rounded-lg border-slate-200 shadow-sm p-2.5 border text-sm focus:ring-2 focus:ring-blue-500 outline-none" required @input="generateKeys">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Dossier</label>
              <input v-model="form.folder" type="text" class="w-full rounded-lg border-slate-200 shadow-sm p-2.5 border text-sm focus:ring-2 focus:ring-blue-500 outline-none" required>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <select v-model="form.category" class="w-full rounded-lg border-slate-200 p-2.5 border text-sm">
              <option>Dev Web</option><option>IA</option><option>Jeux Vidéo</option><option>Logiciel</option>
            </select>
            <select v-model="form.purpose" class="w-full rounded-lg border-slate-200 p-2.5 border text-sm">
              <option value="Personnel">Personnel</option><option value="Éducation">Éducation</option><option value="Professionnel">Professionnel</option>
            </select>
          </div>
          <label class="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <input v-model="form.isOngoing" type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
            En cours
          </label>
        </div>

        <!-- Translated Content -->
        <div class="space-y-4" v-if="trans[currentLang]">
          <div v-for="field in ['description', 'longDescription', 'context', 'personalContribution', 'duration', 'startDate', 'endDate']" :key="field">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">{{ field }}</label>
            <textarea v-if="['longDescription', 'context', 'personalContribution'].includes(field)" 
                      v-model="trans[currentLang][(form as any)[field]]" 
                      class="w-full rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            <input v-else v-model="trans[currentLang][(form as any)[field]]" type="text" 
                   class="w-full rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500">
          </div>
        </div>

        <!-- Features & Links -->
        <div class="space-y-4">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Features</label>
          <div class="space-y-2">
            <div v-for="(feature, idx) in form.features" :key="feature + idx" class="flex items-center gap-2">
              <input v-if="trans[currentLang]" v-model="trans[currentLang][feature]" type="text" class="flex-1 rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500" :placeholder="feature">
              <button type="button" @click="removeFeature(idx)" class="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">Supprimer</button>
            </div>
            <button type="button" @click="addFeature" class="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition">Ajouter une feature</button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Lien demo</label>
              <input v-model="form.links.demo" type="text" class="w-full rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Lien github</label>
              <input v-model="form.links.github" type="text" class="w-full rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
        </div>

        <!-- Assets -->
        <div class="space-y-4">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Assets</label>
          <div class="flex items-center gap-4">
            <input type="file" @change="onLogoChange" accept="image/*" class="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700">
            <img v-if="previews.logo" :src="previews.logo" class="w-12 h-12 object-contain border rounded p-1">
          </div>
          <div class="drop-zone p-6 rounded-xl text-center cursor-pointer border-2 border-dashed border-slate-200 transition-all" 
               @dragover.prevent="dropActive = true" 
               @dragleave.prevent="dropActive = false" 
               @drop.prevent="onImagesDrop" 
               @click="($refs.imagesInput as HTMLInputElement).click()" 
               :class="{'border-blue-500 bg-blue-50': dropActive}">
            <p class="text-xs text-slate-400">Glissez ou cliquez pour les images</p>
            <input type="file" multiple @change="onImagesChange" accept="image/*" class="hidden" ref="imagesInput">
          </div>
          <div ref="imageList" class="flex flex-wrap gap-3 mt-4">
            <div v-for="(item, idx) in imageItems" :key="item.id" class="sortable-item relative group cursor-move w-20 h-20 border rounded-lg overflow-hidden" :data-id="idx">
              <img :src="item.preview" class="w-full h-full object-cover">
              <button @click.stop="removeImage(idx)" class="absolute top-1 right-1 bg-red-500 p-0.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Techs -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Technologies</label>
            <button type="button" @click="openTechManager" class="text-[10px] font-black text-blue-600 uppercase hover:underline">Gérer les Techs</button>
          </div>

          <div class="flex flex-wrap gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100 max-h-32 overflow-y-auto">
            <span v-for="(icon, name) in techs" :key="name" @click="toggleTech(name as string)" :class="['px-2 py-0.5 rounded-full text-[9px] font-bold border transition cursor-pointer', form.tags.includes(name as string) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200']">{{ name }}</span>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition shadow-xl tracking-widest text-sm uppercase">
          {{ form.id ? 'Mettre à jour' : 'Créer' }}
        </button>
      </form>
    </div>

    <!-- Right Preview -->
    <div class="flex-1 bg-slate-200 overflow-y-auto p-12">
      <div class="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden preview-container min-h-full">
        <div v-if="trans[currentLang]" class="p-10 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h1 class="project-title-preview mb-4">{{ form.name || 'Nom' }}</h1>
            <p class="text-xl text-slate-400 italic">{{ trans[currentLang][form.description] || '...' }}</p>
          </div>
          <router-link v-if="form.id && !form.id.startsWith('project-temp-')" :to="{ name: 'project-detail', params: { id: form.id } }" target="_blank" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold uppercase transition">Voir en live</router-link>
        </div>
        <div class="p-10 grid grid-cols-3 gap-10">
          <div class="col-span-2 space-y-10">
            <div class="bg-slate-100 rounded-3xl aspect-video overflow-hidden shadow-inner relative flex items-center justify-center">
              <img v-if="previews.images.length" :src="previews.images[currentImageIndex]" class="w-full h-full object-cover">
              <span v-else class="text-slate-300 font-bold uppercase tracking-widest">Images</span>
              <div v-if="previews.images.length" class="absolute inset-0 flex items-center justify-between px-4">
                <button type="button" class="carousel-btn" @click="prevImage" :disabled="previews.images.length < 2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" class="carousel-btn" @click="nextImage" :disabled="previews.images.length < 2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div v-if="previews.images.length" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <button v-for="(img, idx) in previews.images" :key="img + idx" type="button" @click="selectImage(idx)" :class="['carousel-dot', idx === currentImageIndex ? 'active' : '']"></button>
              </div>
            </div>
            <section v-if="trans[currentLang]">
              <h2 class="text-2xl font-black text-slate-900 mb-4">Description</h2>
              <p class="text-slate-600 leading-loose whitespace-pre-line">{{ trans[currentLang][form.longDescription] || '...' }}</p>
            </section>
          </div>
          <aside class="space-y-6">
            <div class="info-card-preview">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                  <img v-if="previews.logo" :src="previews.logo" class="w-full h-full object-contain p-2">
                  <span v-else class="text-[10px] text-slate-400 font-bold uppercase">Logo</span>
                </div>
                <div>
                  <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Catégorie</div>
                  <div class="text-sm font-semibold text-slate-900">{{ form.category || '—' }}</div>
                  <div class="mt-2">
                    <span :class="['purpose-badge-preview', (form.purpose || '').toLowerCase() === 'personnel' ? 'purpose-personnel' : (form.purpose || '').toLowerCase() === 'éducation' ? 'purpose-education' : 'purpose-professionnel']">{{ form.purpose || '—' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-card-preview" v-if="trans[currentLang]">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Contexte</div>
              <p class="text-sm text-slate-600 mt-2 whitespace-pre-line">{{ trans[currentLang][form.context] || '...' }}</p>
            </div>
            <div class="info-card-preview" v-if="trans[currentLang]">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Contribution</div>
              <p class="text-sm text-slate-600 mt-2 whitespace-pre-line">{{ trans[currentLang][form.personalContribution] || '...' }}</p>
            </div>
            <div class="info-card-preview" v-if="trans[currentLang]">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Dates</div>
              <div class="mt-2 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-400">Debut</span>
                  <span class="text-slate-700 font-semibold">{{ trans[currentLang][form.startDate] || '—' }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-400">Fin</span>
                  <span class="text-slate-700 font-semibold">{{ form.isOngoing ? 'En cours' : (trans[currentLang][form.endDate] || '—') }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-400">Duree</span>
                  <span class="text-slate-700 font-semibold">{{ trans[currentLang][form.duration] || '—' }}</span>
                </div>
              </div>
            </div>
            <div class="info-card-preview">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Liens</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <a v-if="form.links && form.links.demo" :href="form.links.demo" target="_blank" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white">Demo</a>
                <a v-if="form.links && form.links.github" :href="form.links.github" target="_blank" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">Github</a>
                <span v-if="!(form.links && (form.links.demo || form.links.github))" class="text-xs text-slate-400">Aucun</span>
              </div>
            </div>
            <div class="info-card-preview" v-if="trans[currentLang]">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Features</div>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">
                <li v-if="!form.features || !form.features.length" class="text-xs text-slate-400">Aucune</li>
                <li v-for="(feature, idx) in form.features" :key="idx" class="flex items-start gap-2">
                  <span class="mt-1 w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{{ trans[currentLang][feature] || '...' }}</span>
                </li>
              </ul>
            </div>
            <div class="info-card-preview">
              <div class="text-xs font-black text-slate-400 uppercase tracking-wider">Technologies</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-if="!form.tags.length" class="text-xs text-slate-400">Aucune</span>
                <span v-for="tag in form.tags" :key="tag" class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600">{{ tag }}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Tech Manager Modal -->
    <div v-if="showTechModal" class="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]">
      <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl m-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">Gestion des Technologies</h2>
          <button @click="showTechModal = false" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>

        <div class="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">{{ editingTech ? 'Modifier' : 'Ajouter' }} une Tech</h3>
          <div class="grid grid-cols-2 gap-4">
            <input v-model="techForm.name" type="text" placeholder="Nom (ex: React)" class="w-full rounded-lg border-slate-200 p-2.5 border text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <div class="flex items-center gap-2 overflow-hidden">
              <input type="file" @change="onTechIconChange" accept="image/*" class="text-[10px] flex-1">
              <img v-if="techForm.preview" :src="techForm.preview" class="w-8 h-8 object-contain">
            </div>
          </div>
          <div class="flex gap-2 mt-4">
            <button @click="saveTech" :disabled="!techForm.name" class="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg text-xs uppercase tracking-widest hover:bg-blue-700 transition">
              {{ editingTech ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button v-if="editingTech" @click="cancelTechEdit" class="px-4 py-2 bg-slate-200 text-slate-600 font-bold rounded-lg text-xs uppercase tracking-widest">Annuler</button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto space-y-2 pr-2">
          <div v-for="(icon, name) in techs" :key="name" class="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition group">
            <div class="flex items-center gap-3">
              <img :src="baseUrl + 'icone/' + icon" class="w-8 h-8 object-contain bg-slate-50 p-1 rounded">
              <span class="text-sm font-semibold text-slate-700">{{ name }}</span>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button @click="editTech(name as string, icon as string)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
              <button @click="deleteTech(name as string)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Crop Modal -->
    <div v-if="showCropModal" class="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]">
      <div class="crop-container bg-white p-4 rounded-xl max-w-[90vw] max-h-[90vh]">
        <div class="mb-4 overflow-hidden rounded-lg bg-slate-100" style="max-height: 50vh;">
          <img id="cropper-img" :src="cropImageSrc" class="max-w-full block">
        </div>
        <div class="flex gap-3">
          <button @click="cancelCrop" class="flex-1 px-4 py-2 bg-slate-200 font-bold rounded-lg text-sm">Annuler</button>
          <button @click="applyCrop" class="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-title-preview { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.purpose-badge-preview { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
.purpose-personnel { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
.purpose-education { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }
.purpose-professionnel { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
.info-card-preview { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; }
.carousel-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(15, 23, 42, 0.7); color: white; display: inline-flex; align-items: center; justify-content: center; transition: 0.2s; }
.carousel-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.carousel-dot { width: 8px; height: 8px; border-radius: 999px; background: #cbd5e1; transition: 0.2s; border: none; }
.carousel-dot.active { width: 20px; background: #3b82f6; }
.lang-tab { cursor: pointer; padding: 2px 8px; font-size: 10px; font-weight: bold; border-radius: 4px; border: 1px solid #e2e8f0; }
.lang-tab.active { background: #3b82f6; color: white; border-color: #3b82f6; }
</style>
