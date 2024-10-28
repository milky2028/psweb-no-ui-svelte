let memory = $state(0.25);
export const setMemory = (newMemory: number) => (memory = newMemory);
export const getMemory = () => memory;
