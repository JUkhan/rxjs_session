import { BehaviorSubject, map, switchMap, mergeMap, Observable } from 'rxjs'
import {dispatch} from './helper'

export class Component1 {
    public XModel$: Observable<any[]>
    private xModel: any[] = [];
    constructor() {
        this.XModel$ = new Observable(observer => observer.next(this.xModel))
            .pipe(
                map((xmodel:any) => intensiveChecking(xmodel, true)?xmodel:undefined)
               
            );
    }

    public get Model(){
        return this.xModel
    }

    public AddCom1(data: any) {
        this.xModel.push(data);
    }

    public validate(){
        return intensiveChecking(this.Model, true)?this.Model:undefined
    }
}

export class Component2 {
    public YModel$: Observable<any[]>
    private yModel: any[] = [];
    constructor() {
        this.YModel$ = new Observable(observer => observer.next(this.yModel))
            .pipe(
                map((xmodel:any) => intensiveChecking(xmodel, true)?xmodel:undefined)
            );
    }

    public AddCom2(data: any) {
        this.yModel.push(data);
    }

    public get Model(){
        return this.yModel
    }

    public validate(){
        return intensiveChecking(this.Model, false)?this.Model:undefined
    }
}

function intensiveChecking(model: any[], flag: boolean) {
   
    if (flag && model && model.length < 3) {
        dispatch('MESSAGE', 'X Model Error')
        //return new BehaviorSubject(false);
        return false;
        
    }
    else if (!flag && model && model.length < 5) {
        dispatch('MESSAGE', 'Y Model Error')
        //return new BehaviorSubject(false);
        return false
    }
    
    //return new BehaviorSubject(true);
    return true
   
}

export function getModel(id:any){
    return 1
}