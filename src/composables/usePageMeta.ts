import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { DEFAULT_OG_IMAGE } from '@/utils/seo'

/**
 * Définit le <title> et les balises meta/OG d'une page secondaire de façon
 * réactive à la langue. Passe une clé i18n (ou un getter) pour le titre, et
 * optionnellement une clé i18n pour la description.
 */
export function usePageMeta(
  titleKey: MaybeRefOrGetter<string>,
  descriptionKey?: MaybeRefOrGetter<string | undefined>,
) {
  const { t } = useI18n()

  const title = computed(() => `${t(toValue(titleKey))} | Alexis Michaux-Kinet`)
  const description = computed(() => {
    const key = toValue(descriptionKey)
    return key ? t(key) : undefined
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_OG_IMAGE,
  })
}
