import './style.css'
import {combineLatest} from 'rxjs'
import {dispatch} from './helper'
import {AwesomeService} from './awesome.service'
import {SearchTodo} from './todo'

const btn1=document.getElementById('com1')!
const btn2=document.getElementById('com2')!
const btn3=document.getElementById('save')!

btn1.addEventListener('click', btn1ClickHandler);
btn2.addEventListener('click', btn2ClickHandler);
btn3.addEventListener('click', saveClickHandler);

const service = new AwesomeService();
service.stream$.subscribe(console.log)
service.select(state=>state.loading).subscribe(val=>dispatch('PROGRESS', val))
function btn1ClickHandler(){
  service.inc()
}

function btn2ClickHandler(){
   service.asyncInc('sss')
}

function saveClickHandler(){
  service.asyncInc2('wee')
}