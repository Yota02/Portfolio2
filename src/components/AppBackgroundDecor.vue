<template>
  <div class="background-decor">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
.background-decor {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

.blob-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(var(--primary-rgb), 0.15); }
.blob-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: rgba(var(--accent-rgb), 0.15); animation-delay: -5s; }
.blob-3 { top: 40%; left: 40%; width: 30vw; height: 30vw; background: rgba(254, 243, 199, 0.1); opacity: 0.3; animation-duration: 30s; }

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

@media (prefers-color-scheme: dark) {
  .blob { opacity: 0.2; }
}
</style>
