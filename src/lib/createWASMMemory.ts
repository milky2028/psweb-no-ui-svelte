export const WASM_BLOCK_SIZE = 65536;
export const ONE_GIBIBYTE = 1024 * 1024 * 1024;

declare global {
  interface Window {
    Module: { wasmMemory: WebAssembly.Memory }
  }
}

export function createWasmMemory(value: number) {
      const memory = new WebAssembly.Memory({
    initial: (value * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    maximum: (4 * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    shared: true,
  });

  window.Module = window.Module || {};
  window.Module.wasmMemory = memory;
}
