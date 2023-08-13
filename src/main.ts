import './style.css'
import { debounceTime, switchMap, tap, BehaviorSubject } from 'rxjs'
import { dispatch, select, callApi } from './helper.ts'

const searchText = document.getElementById('searchText')!;
const resDiv = document.getElementById('res')!;
searchText.addEventListener('input', textChanging);

const bs = new BehaviorSubject('')

function textChanging(e: any) {
    //console.log(e.target.value);
    dispatch('SEARCH',e.target.value)
}

select('SEARCH').pipe(
    debounceTime(320),
    tap(_=> dispatch('PROGRESS', true)),
    switchMap(val=>callApi(val))
)

.subscribe(res=>{
    resDiv.innerText=res
    dispatch('PROGRESS', false)
    dispatch('MESSAGE','Search successful')
    dispatch('MESSAGE','COOL!')
})
