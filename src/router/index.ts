import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue')
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
      component: () => import('../views/VictoriaView.vue')
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
      path: '/projects-timeline',
      name: 'projects-timeline',
      component: () => import('../views/ProjectsTimelineView.vue')
    },
    {
      path: '/projects/:projectId/sub/:subId',
      name: 'sub-project-detail',
      component: () => import('../views/SubProjectDetailView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/ecosystem',
      name: 'ecosystem',
      component: () => import('../views/EcosystemView.vue')
    },
    {
      path: '/rosalind',
      name: 'rosalind',
      component: () => import('../views/RosalindView.vue')
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
