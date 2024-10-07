let memory = $state(2);
export const setMemory = (newMemory: number) => (memory = newMemory);
export const getMemory = () => memory;
