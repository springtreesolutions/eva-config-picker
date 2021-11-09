// Ideally this file is placed in typings.d.ts but thats not possible
// https://stackoverflow.com/questions/52351620/stenciljs-typescript-cannot-find-name-when-exporting-an-enum
//
export enum AuthState {
  LOADING = 'loading',
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out'
}
