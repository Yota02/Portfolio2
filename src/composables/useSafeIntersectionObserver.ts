import { onUnmounted } from 'vue'

export function useSafeIntersectionObserver() {
  const observers: IntersectionObserver[] = []

  const observe = (
    targets: NodeListOf<Element> | Element[] | Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    const observer = new IntersectionObserver(callback, options)
    observers.push(observer)

    if (targets instanceof Element) {
      observer.observe(targets)
    } else {
      targets.forEach(el => observer.observe(el))
    }

    return observer
  }

  const disconnectAll = () => {
    observers.forEach(obs => obs.disconnect())
    observers.length = 0
  }

  onUnmounted(() => {
    disconnectAll()
  })

  return {
    observe,
    disconnectAll
  }
}
