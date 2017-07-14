/**
 * Created by xinzheng on 8/6/17.
 */
import {Observable} from  "rxjs";
import {subscribeOn} from "rxjs/operator/subscribeOn";


// let numbers = [1, 5, 10];

// let source = Observable.from(numbers);

// class MyObserver implements Observer<number> {
//
//     next(value):void {
//         console.log(`value: ${value}`);
//     }
//
//     error(e):void {
//         console.log(`error: ${e}`);
//     }
//
//     complete():void {
//         console.log("complete");
//     }
// }

// let Obs = new MyObserver();

// let source = Observable.create(observer=>{
//     let index = 0;
//
//     let produceValue = () => {
//         observer.next(numbers[index++]);
//
//         if(index < numbers.length) {
//             setTimeout(produceValue, 250);
//         }else {
//             observer.complete();
//         }
//     }
//     produceValue();
//
// }).map(n=> n * 2)
//     .filter(n => n > 4);

// observe event
// let circle = document.getElementById("circle");
let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");
    // .map((e: MouseEvent) => {
    //     return {
    //         x: e.clientX,
    //         y: e.clientY
    //     }
    // })
    // .filter(value => value.x < 5)
    // .delay(300);

// function onNext(value) {
//     circle.style.left = value.x;
//     circle.style.top = value.y;

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }

        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy());
}

function retryStrategy() {
    return function (errors) {
        return errors
            .scan((acc, value)=>{
                console.log(acc, value);
                return acc + 1;
            }, 0)
            .takeWhile(acc => acc < 4)
            .delay(1000);
    }
}

function renderMovies(movies) {
    movies.forEach(m=>{
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

click.flatMap(e=>load("movies.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );

// click.subscribe(
//     e => load("movies.json"),
//     // value => console.log(value),
//     e => console.log(`error: ${e}`),
//     () =>  console.log("complete")
// );
