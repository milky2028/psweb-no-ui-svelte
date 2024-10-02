const status = $state('...')
export function updateStatus = (update: string) => status.set(status.get() + update)