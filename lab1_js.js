"use strict";

function fillArray(n, arr = [])
{
        if(n && n>0)
        {
            let temp
            for(let i = 0; i<n; ++i)
            {
            	switch
                temp = prompt(`Enter ${i+1} element of array`)
                if(temp === '')
                {
                    alert('incorret, try again')
                    --i
                    continue
                }
               
                if(temp === null)
                {
                    return
                }
                temp = +temp
                if(temp === 0)
                {
                    arr[i] = temp
                    continue
                }
                arr[i] = temp ? temp : (0, alert('incorret, try again'), --i)
            }
        }
        else alert('Incorrect')
        return arr
}

function notQuickSort(arr){
    for (let i = 0, endI = arr.length - 1; i < endI; ++i) {
        for (let j = 0, endJ = endI - i; j < endJ; ++j) {
            if (arr[j] > arr[j + 1]) {
                let swap = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = swap
            }
        }
    }
    return arr
}

function showSum(arr){
    let sum = 0
    for(let i = 0; i<arr.length; ++i)
            {
                sum += arr[i]
            }
    alert('Sum is: '+sum)
}



let n = +prompt("Enter number of elements")
let arrr = fillArray(n)
arrr = notQuickSort(arrr)
showSum(arrr)
alert('Min element: '+arrr[0]+', max element: '+arrr[n-1])


