function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// export function getArrayRandom(size, max) {
//     let arr = []
//     while (arr.length < size) {
//         let random = getRandomInt(max)
//         let numExist = false
//         for (let i = 0; i < arr.length; i++)
//             if (arr[i] === random) {
//                 numExist = true
//                 //console.log("true !", random)
//             }
//         if (!numExist) {
//             arr.push(random)
//         }
//     }
//     return arr
// }

export const getArrayRandom = (size, max) => {
    let arr = []
    while (arr.length < size) {
        let random = getRandomInt(max)
        let numExist = false
        for (let i = 0; i < arr.length; i++)
            if (arr[i] === random) {
                numExist = true
                //console.log("true !", random)
            }
        if (!numExist) {
            arr.push(random)
        }
    }
    return arr
}