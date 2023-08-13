import './style.css'
import {combineLatest} from 'rxjs'
import {dispatch} from './helper'
import {Component1, Component2, getModel} from './components'

const btn1=document.getElementById('com1')!
const btn2=document.getElementById('com2')!
const btn3=document.getElementById('save')!

btn1.addEventListener('click', btn1ClickHandler);
btn2.addEventListener('click', btn2ClickHandler);
btn3.addEventListener('click', saveClickHandler);
const com1 = new Component1();
const com2 = new Component2();

function btn1ClickHandler(){
    com1.AddCom1(getModel('id1'))
    btn1.innerText = `Com 1 (${com1.Model.length})`
}

function btn2ClickHandler(){
    com2.AddCom2(getModel('id1'))
    btn2.innerText = `Com 2 (${com2.Model.length})`
}

function saveClickHandler(){
    // combineLatest([
    //     com1.XModel$,
    //     com2.YModel$
    // ]).subscribe(([model1, model2])=>{
        const model1=com1.validate()
        const model2=com2.validate()
        console.log(model1, model2)
        if(model1)
        dispatch('MESSAGE', 'Model1 is valid!')
        if(model2)
        dispatch('MESSAGE', 'Also model2 is valid!')
    //})
}

