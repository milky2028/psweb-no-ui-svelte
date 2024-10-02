import { createWasmMemory } from "./createWASMMemory";

export type BootStep = {
    autorun: boolean,
    disabled: boolean,
    success: boolean,
    failed: boolean,
    name: string,
    action: VoidFunction
}

export const bootSteps = $state([
  {
    autorun: false,
    disabled: false,
    success: false,
    failed: false,
    name: 'Create WASM Memory',
    action: createWasmMemory
  },
  {
    autorun: false,
    disabled: false,
    success: false,
    failed: false,
    name: 'Load Emscripten JS Glue Code',
    action: () => {}
  },
    {
    autorun: false,
    disabled: false,
      success: false,
    failed: false,
    
    name: 'Load WASM',
    action: () => {}
  },
        {
    autorun: false,
    disabled: false,
          success: false,
    failed: false,
    
    name: 'Create and Attach Canvas',
    action: () => {}
  },
                {
    autorun: false,
    disabled: false,
                  success: false,
    failed: false,
    
    name: 'Import File and Open',
    action: () => {}
  },
                                {
    autorun: false,
    disabled: false,
                                  success: false,
    failed: false,
    
    name: 'Draw Brushstroke',
    action: () => {}
  },
])
