import { pluck } from 'rxjs/operators';
import { LitElement } from "lit-element";
import { Observable } from "rxjs";
import { getState, setState } from "./util";

// customEmit of events =======================================================

interface IEmitEvent {
  name: string;
  bubbles: boolean;
}
export const customEmit: Function = (options: IEmitEvent) => {
  return (klass: any) => {
    return class extends klass {
      emitList!: Array<IEmitEvent>;

      constructor() {
        super();
        this.emitList = this.emitList ? [...this.emitList, options] : [options];
      }

      emit(evName: string, detail: any): void {
        if (!this.emitList.find(emitItem => emitItem.name === evName)) {
          throw new Error(`Invalid event: "${evName}"`);
        }

        const { bubbles } = options;
        this.dispatchEvent(new CustomEvent(evName, { bubbles, composed: bubbles, detail }));
      }
    }
  }
}

// useState ===================================================================

export const useState: any = () => {
  return (target: any) => {
    return class extends target {
      getState(key?: string): Observable<any> {
        return key ? getState().pipe(pluck(key)) : getState();
      }

      setState(value: any): void {
        setState(value);
      }
    }
  }
}

// service injector ===========================================================

type ServiceDecorator = (component: any) => (target: any, property: string) => any;
export const service: ServiceDecorator = (klass: any) => (target: any, property: string) => target[property] = new klass();

// this can be moved ==========================================================

export const event: any = (key?: string) => {
  return (target: any, methodName: string, propertyDescriptor: PropertyDescriptor) => {
    const original: Function = propertyDescriptor.value;
    propertyDescriptor.value = function (event: any, ...args: any) {
      return key ? original.call(target, event[key], args) : original.call(target, event.detail, args);
    }
  };
}

// this can be moved ==========================================================

export class UIElement extends LitElement {
  emit(name: string, data: any): void { }
  getState(key?: string): Observable<any> | any { }
  setState(value: any): void { }
}
