import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import SubProjectDetailView from '../views/SubProjectDetailView.vue'
import VictoriaView from '../views/VictoriaView.vue'
import AboutView from '../views/AboutView.vue'
import ResumeView from '../views/ResumeView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: () => import('../views/CertificationsView.vue')
    },
    {
      path: '/languages',
      name: 'languages',
      component: () => import('../views/LanguagesView.vue')
    },
    {
      path: '/victoria',
      name: 'victoria',
      component: VictoriaView
    },
    {
      path: '/objectives',
      name: 'objectives',
      component: () => import('../views/ObjectivesView.vue')
    },
    {
      path: '/participations',
      name: 'participations',
      component: () => import('../views/ParticipationsView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/projects-timeline',
      name: 'projects-timeline',
      component: () => import('../views/ProjectsTimelineView.vue')
    },
    {
      path: '/projects/:projectId/sub/:subId',
      name: 'sub-project-detail',
      component: SubProjectDetailView,
      props: true
    },
    {
      path: '/competencies',
      name: 'competencies',
      component: () => import('../views/CompetenciesView.vue')
    },
    {
      path: '/portfolio-apprentissage',
      name: 'portfolio-apprentissage',
      component: () => import('../views/PortfolioApprentissageView.vue')
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Gestion des redirections depuis 404.html
router.beforeEach((to, from, next) => {
  if (to.path === '/' && to.query['/']) {
    const path = to.query['/'] as string
    next({ path: path.replace(/~and~/g, '&'), query: {} })
  } else {
    next()
  }
})

export default router
