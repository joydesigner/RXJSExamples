/**
 * Created by xinzheng on 8/6/17.
 */
import {Observable} from  "rxjs";
import {load, loadWithFetch} from './loader';

//
// let source = Observable.merge(
//     Observable.of(1),
//     Observable.from([2, 3, 4]),
//     Observable.throw(new Error("Stop!")),
//     Observable.of(5)
// ).catch(e => {
//   console.log(`caught: ${e}`);
//   return Observable.of(10);
// });
//
// source.subscribe(
//     value => console.log(`value: ${value}`),
//     error => console.log(`error: ${error}`),
//     () => console.log("complete")
// );


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


function renderMovies(movies) {
    movies.forEach(m=>{
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

loadWithFetch("movies.json").subscribe(renderMovies,
  e => console.log(`error: ${e}`),
    () => console.log("complete!"));


click.flatMap(e=>loadWithFetch("moviess.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );


