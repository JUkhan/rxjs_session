import {Action} from './store'

export type Todo = {
    id: number,
    task: string,
    completed: boolean
}

export type Visibility = 'all' | 'active' | 'completed'

export class SearchTodo implements Action{
    type=''
    searchText=''
    constructor(searchText:string){
        this.searchText=searchText;
    }
}

export function getTodos(): Todo[] {
    return [
        { id: 1, task: 'Read Quran Daily', completed: false },
        { id: 2, task: 'Learn Arabic', completed: true },
        { id: 3, task: 'Trust on Allah', completed: false }
    ]
}

