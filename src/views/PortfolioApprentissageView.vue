<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import BaseModal from '@/components/BaseModal.vue';

const baseUrl = import.meta.env.BASE_URL;

const selectedImage = ref<{ url: string; title: string; explanation: string } | null>(null);

const openModal = (image: string, title: string, explanation: string) => {
  selectedImage.value = { url: `${baseUrl}${image}`, title, explanation };
};

const closeModal = () => {
  selectedImage.value = null;
};

const competencies = [
  {
    title: "Compétence 1 : Réaliser un développement d'application (Niveau 3)",
    description: "Concevoir et développer des applications complexes",
    acs: [
      {
        id: "AC 1",
        name: "Choisir et implémenter les architectures adaptées",
        text: "Dans le cadre de ma formation et de mon stage au CSUM, j'ai appris à concevoir des architectures robustes et scalables. J'ai notamment mis en œuvre des architectures MVC, des systèmes modulaires et des refontes sous Django.",
        traces: [
          {
            name: "Refonte du Mission Control Center (Django)",
            link: "/project/project-4",
            type: "diagram",
            image: "projet/CSUM/mcc_architecture.webp",
            explanation: "Schéma de l'architecture du MCC après refonte. L'utilisation de Django a permis de structurer la gestion des codecs et d'améliorer la maintenabilité globale du système de communication satellite."
          },
          {
            name: "Architecture Modulaire de Victoria",
            link: "/project/project-7",
            type: "diagram",
            image: "projet/Victoria/main.webp",
            explanation: "Ce diagramme illustre l'architecture découplée de Victoria. Le cœur de l'application communique avec les plugins via une interface standardisée, permettant une extension sans modification du noyau."
          },
          {
            name: "Architecture Web Flask/JS - CodeTonFutur",
            link: "/project/project-1",
            type: "interface",
            image: "projet/CodeTonFutur/main.webp",
            explanation: "Capture d'écran de l'interface principale montrant l'intégration fluide entre le backend Flask et le frontend réactif."
          },
          {
            name: "World of Chan (Version Live)",
            link: "/project/project-8",
            type: "interface",
            image: "projet/WorldOfChan/live_capture.jpeg",
            explanation: "Interface de l'application en production, illustrant une mise en œuvre réussie d'une application web progressive (PWA) avec une interface utilisateur soignée."
          },
          {
            name: "Architecture des Plugins (UML) - Capital Wars",
            link: "/project/project-3",
            type: "diagram",
            image: "projet/CapitalWars/uml_plugins.webp",
            explanation: "Diagramme de classes UML illustrant l'utilisation intensive des interfaces pour créer un système de plugins extensible. Cette architecture permet d'injecter de nouvelles fonctionnalités de manière totalement découplée."
          }
        ]
      },
      {
        id: "AC 2",
        name: "Faire évoluer une application existante",
        text: "La reprise de code existant a été une mission centrale de mon stage. Au CSUM, j'ai dû analyser et refondre le code hérité du MCC pour intégrer de nouveaux protocoles de communication.",
        traces: [
          {
            name: "Optimisation des Codecs (Héritage)",
            link: "/project/project-4",
            type: "code",
            language: "python",
            code: "class BaseCodec(ABC):\n    @abstractmethod\n    def encode(self, data):\n        pass\n\nclass NewSatelliteCodec(BaseCodec):\n    def encode(self, data):\n        # Implementation optimisée",
            explanation: "Mise en place d'une structure de classes abstraites pour harmoniser la gestion des différents codecs satellites au sein du MCC."
          },
          {
            name: "Système de chargement de plugins (Python)",
            link: "/project/project-7",
            type: "code",
            language: "python",
            code: "def load_plugins(self):\n    for plugin_name in os.listdir(self.plugin_dir):\n        if plugin_name.endswith('.py'):\n            module = importlib.import_module(f'plugins.{plugin_name[:-3]}')\n            self.plugins.append(module.Plugin())",
            explanation: "Extrait de code montrant le mécanisme d'import dynamique. Cette approche permet d'ajouter des fonctionnalités à l'assistant simplement en déposant un fichier dans le dossier dédié."
          },
          {
            name: "Système d'affichage modulaire (Twig) - Capital Wars",
            link: "/project/project-3",
            type: "code",
            language: "twig",
            code: "{% for key, value in bilan.passif %}\n  {% if key not in excluded_passif_keys %}\n    <div class=\"row\">\n      <div class=\"label\">{{ key | replace({'_': ' '}) | title }}</div>\n      <div class=\"value\">{{ value | number_format(0, ',', ' ') }}</div>\n    </div>\n  {% endif %}\n{% endfor %}",
            explanation: "Utilisation de templates dynamiques Twig pour générer des interfaces modulaires. Ce code permet d'afficher des données variables sans modifier la structure du template, facilitant l'ajout de nouveaux modules de jeu."
          },
          {
            name: "Implémentation Modulaire (Code) - Capital Wars",
            link: "/project/project-3",
            type: "interface",
            image: "projet/CapitalWars/code_plugin.webp",
            explanation: "Détail de l'implémentation montrant la gestion dynamique des données du bilan via Twig."
          }
        ]
      },
      {
        id: "AC 3",
        name: "Intégrer des solutions dans un environnement de production",
        text: "J'ai acquis une solide expérience dans le déploiement. L'automatisation du clonage de postes au CSUM a été un défi d'intégration majeure dans un réseau d'entreprise.",
        traces: [
          {
            name: "Infrastructure de clonage PXE",
            link: "/project/project-4",
            type: "diagram",
            image: "projet/CSUM/pxe_infrastructure.webp",
            explanation: "Schéma de l'infrastructure réseau mise en place pour permettre le boot PXE et le clonage automatisé des postes via le serveur Master."
          },
          {
            name: "Configuration Docker Compose",
            link: "/project/project-2",
            type: "code",
            language: "yaml",
            code: "services:\n  app:\n    build: .\n    ports:\n      - \"5000:5000\"\n    environment:\n      - DATABASE_URL=mysql://user:pass@db/ctf",
            explanation: "Exemple de configuration Docker utilisée pour isoler les challenges de cybersécurité du reste de l'infrastructure."
          },
          {
            name: "Déploiement Automatisé Gecolab (GitHub Actions)",
            link: "/project/project-gecolab",
            type: "code",
            language: "yaml",
            code: "name: Deploy Website\non:\n  push:\n    branches: [ main ]\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Build\n        run: npm install && npm run build\n      - name: Deploy\n        uses: JamesIves/github-pages-deploy-action@4.1.5\n        with:\n          branch: gh-pages\n          folder: dist",
            explanation: "Mise en place d'une pipeline CI/CD pour le projet Gecolab. À chaque push sur la branche principale, le site est automatiquement compilé et déployé sur les serveurs de production."
          }
        ]
      }
    ]
  },
  {
    title: "Compétence 5 : Conduire un projet (Niveau 3)",
    description: "Répondre aux besoins du client et mener à bien un projet",
    acs: [
      {
        id: "AC 1",
        name: "Organiser et partager une veille numérique",
        text: "Ma veille technologique porte sur l'IA et le spatial. J'utilise mes outils personnels pour automatiser ce processus.",
        traces: [
          {
            name: "Dashboard de Veille RSS",
            link: "/project/project-7",
            type: "interface",
            image: "projet/Victoria/rss.webp",
            explanation: "Interface centralisant les flux RSS technologiques. La compétence est ici démontrée par la capacité à structurer l'information pour une consultation efficace."
          },
          {
            name: "Extraction de données RSS (Python)",
            link: "/project/project-7",
            type: "code",
            language: "python",
            code: "import feedparser\n\ndef get_entries(url):\n    feed = feedparser.parse(url)\n    return feed.entries[:5]",
            explanation: "Extrait technique montrant l'utilisation de bibliothèques spécialisées pour automatiser la récupération de l'information."
          }
        ]
      },
      {
        id: "AC 4",
        name: "Accompagner le management de projet informatique",
        text: "Au CSUM, j'ai suivi un cycle de vie logiciel complet, de la rédaction du cahier des charges à la documentation utilisateur.",
        traces: [
          {
            name: "Documentation Utilisateur Star Guardian",
            link: "/project/project-4",
            type: "interface",
            image: "projet/CSUM/starguardian_doc.webp",
            explanation: "Aperçu de la documentation technique rédigée pour permettre aux futurs stagiaires et ingénieurs de reprendre le projet Star Guardian."
          },
          {
            name: "Gestion de backlog (Scrum)",
            link: "/project/project-2",
            type: "diagram",
            image: "projet/CTF/backlog.webp",
            explanation: "Représentation visuelle de notre sprint backlog. Cela illustre ma capacité à organiser les tâches et à suivre l'avancement d'une équipe projet."
          },
          {
            name: "Nuit de l'Info 2025 (Rendu Live)",
            link: "/project/project-11",
            type: "interface",
            image: "projet/Ndi2025/live_capture.webp",
            explanation: "Interface finale de la Nuit de l'Info, fruit d'une coordination intense en équipe sur une période de 15h non-stop."
          },
          {
            name: "Gestion des Issues Client - Gecolab",
            link: "/project/project-gecolab",
            type: "interface",
            image: "projet/Gecolab/services.jpeg",
            explanation: "Pour le projet Gecolab, j'ai utilisé les issues GitHub pour centraliser les retours du client. Chaque demande a été transformée en ticket technique, permettant un suivi transparent et rigoureux de l'avancement."
          }
        ]
      }
    ]
  },
  {
    title: "Compétence 6 : Manager le SI (Niveau 3 - Parcours IAMSI)",
    description: "Intégrer et manager le système d'information de l'organisation",
    acs: [
      {
        id: "AC 2",
        name: "Intégrer un projet dans le système d’information",
        text: "L'intégration est une étape charnière pour tout nouveau projet. Mon intégration au CSUM m'a permis de travailler en étroite collaboration avec des experts, tandis que mes projets cloud démontrent ma capacité à connecter des briques hétérogènes.",
        traces: [
          {
            name: "Réunion de sprint et debriefing CSUM",
            link: "/project/project-4",
            type: "interface",
            image: "projet/CSUM/team_work.webp",
            explanation: "Illustration de la collaboration quotidienne avec le tuteur de stage et l'équipe technique pour valider les étapes du projet de clonage, garantissant que chaque évolution du code est intégrée de manière sécurisée et reproductible."
          },
          {
            name: "World of Chan (Intégration Firebase)",
            link: "/project/project-8",
            type: "interface",
            image: "projet/WorldOfChan/live_capture.jpeg",
            explanation: "Illustration de l'intégration de services cloud (Firebase) pour la gestion des données en temps réel et l'authentification dans un système d'information moderne."
          },
          {
            name: "Configuration Workflow GitHub Actions",
            link: "/project/project-15",
            type: "code",
            language: "yaml",
            code: "name: Deploy to K8s\non: [push]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Deploy\n        run: kubectl apply -f k8s/",
            explanation: "Automatisation du déploiement (CI/CD) garantissant que chaque évolution du code est intégrée de manière sécurisée et reproductible."
          },
          {
            name: "CI/CD Pipeline - Gecolab",
            link: "/project/project-gecolab",
            type: "code",
            language: "yaml",
            code: "name: Gecolab CI/CD\non:\n  push:\n    branches: [ main ]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Build and Deploy\n        run: |\n          npm install\n          npm run build\n          # Commande de déploiement automatique",
            explanation: "Mise en place d'un déploiement automatisé (GitHub Actions) pour le projet client Gecolab. Le pipeline gère le build Vue.js et le déploiement sur l'infrastructure cible, assurant une intégration continue fiable."
          }
        ]
      }
    ]
  }
];
</script>

<template>
  <div class="portfolio-apprentissage">
    <div class="header-section">
      <h1 class="title">Portfolio d'Apprentissage</h1>
      <p class="subtitle">Parcours IAMSI (Intégration d'Applications et Management des SI)</p>
      <div class="title-underline"></div>
    </div>

    <div class="intro-section">
      <p class="intro-text">
        Ce portfolio présente l'acquisition de mes compétences tout au long de ma troisième année de BUT Informatique. Il synthétise mon évolution et illustre par des exemples concrets, issus des projets présents sur ce site, la manière dont j'ai validé les différentes composantes essentielles de mon parcours.
      </p>
      <div class="professional-link-container">
        <RouterLink to="/experience-professionnelle" class="professional-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Consulter l'analyse de mon expérience professionnelle
        </RouterLink>
      </div>
    </div>

    <div class="competencies-container">
      <section v-for="(comp, index) in competencies" :key="index" class="competence-card" :style="{ transitionDelay: `${index * 150}ms` }">
        <div class="competence-header">
          <h2>{{ comp.title }}</h2>
          <p class="competence-desc">{{ comp.description }}</p>
        </div>

        <div class="ac-list">
          <div v-for="(ac, acIndex) in comp.acs" :key="acIndex" class="ac-item">
            <div class="ac-header">
              <span class="ac-badge">{{ ac.id }}</span>
              <h3 class="ac-name">{{ ac.name }}</h3>
            </div>
            <div class="ac-body">
              <p class="ac-text">{{ ac.text }}</p>

              <div v-if="ac.traces && ac.traces.length > 0" class="ac-traces">
                <h4 class="traces-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Traces justificatives :
                </h4>
                <div class="detailed-traces">
                  <div v-for="(trace, tIndex) in ac.traces" :key="tIndex" class="detailed-trace-card">
                    <div class="trace-visual-container" @click="trace.type !== 'code' && openModal(trace.image || '', trace.name, trace.explanation)">
                      <!-- Image / Diagram -->
                      <img v-if="trace.type !== 'code'" :src="`${baseUrl}${trace.image}`" :alt="trace.name" class="trace-visual-media" />

                      <!-- Code Snippet -->
                      <div v-else class="trace-code-block">
                        <div class="code-header">
                          <span class="code-lang">{{ trace.language }}</span>
                          <span class="code-dot"></span>
                        </div>
                        <pre><code>{{ trace.code }}</code></pre>
                      </div>

                      <div class="trace-type-badge" :class="trace.type">
                        <svg v-if="trace.type === 'interface'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                        <svg v-else-if="trace.type === 'code'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        <svg v-else-if="trace.type === 'diagram'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><line x1="12" y1="3" x2="12" y2="21"></line></svg>
                        {{ trace.type }}
                      </div>

                      <div v-if="trace.type !== 'code'" class="zoom-overlay">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                      </div>
                    </div>

                    <div class="trace-content">
                      <div class="trace-top">
                        <h5 class="trace-label">{{ trace.name }}</h5>
                        <RouterLink :to="trace.link" class="trace-project-link">
                          Voir le projet
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </RouterLink>
                      </div>
                      <p class="trace-explanation">{{ trace.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal for image zoom -->
    <BaseModal :isOpen="selectedImage !== null" @close="closeModal">
      <template #body>
        <div v-if="selectedImage" class="modal-detail-wrapper">
          <img :src="selectedImage.url" :alt="selectedImage.title" class="modal-image" />
          <div class="modal-info">
            <h3 class="modal-title">{{ selectedImage.title }}</h3>
            <p class="modal-explanation">{{ selectedImage.explanation }}</p>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.portfolio-apprentissage {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 1rem auto 0;
  border-radius: 2px;
}

.intro-section {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 4rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.intro-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--primary), var(--accent));
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.professional-link-container {
  display: flex;
  justify-content: center;
}

.professional-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.professional-link:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  filter: brightness(1.1);
}

.competencies-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.competence-card {
  background: var(--color-background-soft);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.competence-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.competence-header {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.competence-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.competence-desc {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.9;
}

.ac-list {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ac-item {
  position: relative;
}

.ac-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ac-badge {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
}

.ac-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading);
}

.ac-body {
  background: rgba(128, 128, 128, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 3px solid var(--primary);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ac-text {
  line-height: 1.7;
  color: var(--color-text);
}

.ac-traces {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.traces-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
}

.detailed-traces {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detailed-trace-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  background: var(--color-background-soft);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.detailed-trace-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.trace-visual-container {
  position: relative;
  height: 100%;
  min-height: 180px;
  background: #1e1e1e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.trace-visual-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.trace-visual-container:hover .trace-visual-media {
  transform: scale(1.05);
}

.zoom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  z-index: 1;
}

.trace-visual-container:hover .zoom-overlay {
  opacity: 1;
}

.trace-code-block {
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #d4d4d4;
  overflow: auto;
  cursor: default;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.code-lang {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7rem;
}

.code-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff5f56;
  box-shadow: 12px 0 #ffbd2e, 24px 0 #27c93f;
  margin-right: 28px;
}

.trace-code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.trace-type-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(4px);
  color: white;
  z-index: 2;
}

.trace-type-badge.interface { background: rgba(59, 130, 246, 0.8); }
.trace-type-badge.code { background: rgba(16, 185, 129, 0.8); }
.trace-type-badge.diagram { background: rgba(245, 158, 11, 0.8); }

.trace-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trace-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.trace-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
}

.trace-project-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  padding: 0.35rem 0.75rem;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.trace-project-link:hover {
  background: var(--primary);
  color: white;
}

.trace-explanation {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  position: relative;
  padding-left: 1rem;
  border-left: 2px solid var(--color-border);
}

/* Modal Styles */
.modal-detail-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
}
.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  background: #000;
  border-radius: 12px 12px 0 0;
}
.modal-info {
  padding: 1.5rem 0 0 0;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}
.modal-explanation {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }

  .portfolio-apprentissage {
    padding: 2rem 1rem;
  }

  .ac-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .detailed-trace-card {
    grid-template-columns: 1fr;
  }

  .trace-visual-container {
    height: 200px;
  }
}
</style>
