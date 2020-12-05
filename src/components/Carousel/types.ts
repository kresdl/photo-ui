export type EnterState = 'enter-right' | 'enter-left' | 'enter-right-active' | 'enter-left-active' | 'entered';
export type ExitState = 'exit-right' | 'exit-left' | 'exit-left-active' |  'exit-right-active' | 'exited';
export type State = EnterState | ExitState;
