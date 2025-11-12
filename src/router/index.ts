import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/projects-timeline',
      name: 'projects-timeline',
      component: () => import('../views/ProjectsTimelineView.vue')
    }
  ]
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
