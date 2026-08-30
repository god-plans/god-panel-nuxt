export interface AppNotification {
  id: string
  title: string
  message: string
  icon: string
  read: boolean
}

/**
 * Header notifications. The sample data below keeps the starter looking alive
 * with no backend — replace the body of `load()` with your own request and the
 * header needs no changes:
 *
 * ```ts
 * items.value = await useApi()<AppNotification[]>('/notifications')
 * ```
 */
const SAMPLE: AppNotification[] = [
  { id: '1', title: 'New order received', message: 'Order #1234 has been placed', icon: 'cart', read: false },
  { id: '2', title: 'Payment failed', message: 'Payment for order #1233 failed', icon: 'credit-card-off', read: false },
  { id: '3', title: 'New user registered', message: 'John Doe joined your platform', icon: 'account-plus', read: false },
]

export function useNotifications() {
  const items = useState<AppNotification[]>('notifications', () => [...SAMPLE])

  const unread = computed(() => items.value.filter((n) => !n.read))

  function markAsRead(id: string) {
    const found = items.value.find((n) => n.id === id)
    if (found) found.read = true
  }

  function markAllAsRead() {
    items.value = items.value.map((n) => ({ ...n, read: true }))
  }

  return { items, unread, markAsRead, markAllAsRead }
}
