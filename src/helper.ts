import {
  BehaviorSubject, of, map, tap, switchMap,
  Observable, mergeMap, takeWhile, animationFrames,
  filter, interval, delay, concatMap
} from 'rxjs';

export type Command = 'INIT' | 'PROGRESS' | 'SEARCH'| 'MESSAGE';
export type Action<T = any> = {
  type: Command,
  payload?: T
}

const dispatcher$: BehaviorSubject<Action> = new BehaviorSubject({ type: 'INIT' });

export function dispatch(action: Command, payload: any = undefined): void {
  dispatcher$.next({ type: action, payload });
}

export function select<T = any>(action: Command): Observable<T> {
  return dispatcher$.pipe(filter(val => val.type === action), map(val => val.payload));
}

export function callApi(val: string): Promise<string> {
  return new Promise(resolve => setTimeout(() => resolve(val.toUpperCase()), 2000))
}

const dotTemplate = document.createElement('div');
dotTemplate.setAttribute('class','anim-div');

const colors = [
  "#FF5733",
  "#E74C3C",
  "#9B59B6",
  "#3498DB",
  "#1ABC9C",
  "#2ECC71",
  "#F39C12",
  "#D35400",
  "#E67E22",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#C0392B",
  "#F1C40F",
  "#7F8C8D",
  "#2C3E50",
  "#34495E",
  "#95A5A6",
  "#BDC3C7"
];

const progress$ = select<boolean>('PROGRESS').pipe(
  switchMap(val => val?interval(30):of()),
  map(_ => ({ x: 220, y: 55 }))
);

progress$
  .pipe(mergeMap((e) => addDot(e.x, e.y)))
  .subscribe();

let c = 0;
function addDot(x: number, y: number) {
  // Pick a random velocity
  const xVelocity = Math.random() * 2 - 1;
  const yVelocity = Math.random() * 2 - 1;

  let dot: HTMLDivElement;

  return animationFrames().pipe(
    // Only take animation frames for 1 second.
    takeWhile(({ elapsed }) => elapsed < 1000),

    // Set the position on the dot as a side-effect.
    tap({
      subscribe: () => {
        // When subscribed to, create and add the dot element when
        // the observable is subscribed to
        dot = dotTemplate.cloneNode() as HTMLDivElement;
        dot.style.backgroundColor = colors[c++];
        if (c >= 20) c = 0;
        document.body.append(dot);
      },
      next: () => {
        // Move our x and y by the predefined velocity
        x += xVelocity;
        y += yVelocity;
        // Update the position of the dot for each value in our animation loop
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      },
      finalize: () => {
        // When the animation is over, or when the consumer unsubscribes
        // remove the dot.
        dot.remove();
      },
    })
  );
}

const msgTemplate = document.createElement('div');
msgTemplate.setAttribute('class','msg-div');

const message$ = select<string>('MESSAGE').pipe(
  concatMap(msg =>of({ x: 50, y: -5, msg }).pipe(delay(500)))
);

message$
  .pipe(mergeMap((e) => addMsg(e.x, e.y, e.msg)))
  .subscribe();

function addMsg(x: number, y: number, msg:string) {
  // Pick a random velocity
  //const xVelocity = Math.random() * 2 - 1;
  const yVelocity =0.8; 
 
  let dot: HTMLDivElement;

  return animationFrames().pipe(
    // Only take animation frames for 1 second.
    takeWhile(({ elapsed }) => elapsed < 2000),

    // Set the position on the dot as a side-effect.
    tap({
      subscribe: () => {
        // When subscribed to, create and add the dot element when
        // the observable is subscribed to
        dot = msgTemplate.cloneNode() as HTMLDivElement;
        dot.innerText=msg;
        document.body.append(dot);
      },
      next: () => {
        // Move our x and y by the predefined velocity
        //x += xVelocity;
        y += yVelocity;
        // Update the position of the dot for each value in our animation loop
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      },
      finalize: () => {
        // When the animation is over, or when the consumer unsubscribes
        // remove the dot.
        dot.remove();
      },
    })
  );
}

