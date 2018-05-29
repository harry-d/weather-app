var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof(a) == "number" && typeof(b) == "number"){
                resolve(a + b);
            }
            reject("arguments must be numbers");
        }, 1500);
    });
}

asyncAdd(5,'6').then(
    (result) => {
        console.log("Sum: ", result);
        return asyncAdd(result, 33);
    }
).then(
    (res) => console.log("Second sum: ", res)
).catch(
    (error) => console.log("Error: ", error)
);

// var somePromise = new Promise((resolve, reject) => {
//
//     setTimeout(() =>
//         //resolve("Yay it worked"),
//         reject("Unable to fulfill promise"),
//         2000);
//
// });
//
// somePromise.then(
//     (message) => console.log("Success:", message),
//     (errorMessage) => console.log("Error: ", errorMessage)
// );
