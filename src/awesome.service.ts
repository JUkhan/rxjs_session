import { StateController, Action } from './store'
import { delay, tap, map, combineLatest, startWith, switchMap } from 'rxjs'
import {callApi, dispatch} from './helper'
import {Todo, Visibility, getTodos, SearchTodo} from './todo'

export type IAwesomeService = {
    count: number,
    loading:boolean
}

export class AwesomeService extends StateController<IAwesomeService>{
    
    constructor() {
        super({ 
            count: 0, 
            loading:false
         });
    }

    public onInit() {
        this.effectOnAction(
            this.action$.whereType('incDone').pipe(
              tap((_) => dispatch('MESSAGE','state incremented')),
              map((action) => this.state)
          ));
    }

    inc(){
        this.emit({count:this.state.count+1})
        this.dispatch('incDone')
    }

    async asyncInc(id:string){
        this.emit({loading:true})
        await callApi(id)
        this.emit({count:this.state.count+1, loading:false})
    }

    asyncInc2=this.effect<string>(id$=>id$.pipe(
        tap(_=>this.emit({loading:true})),
        switchMap(val=>callApi(val)),
        map(_=>({loading:false, count:111}))
    ))

 
}