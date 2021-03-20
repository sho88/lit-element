import { LitElement } from "lit-element";
import { BehaviorSubject } from "rxjs";

// State related constants
const store = new BehaviorSubject<any>({});
const state$ = store.asObservable();
export const setState = (value: any) => store.next({ ...store.value, ...value });
export const getState = () => state$;
