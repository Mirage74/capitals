const readline = require('readline');


function isPalindrome(word)
{
  let flag = true
  let i = 0
  while ( flag && (i < word.length) ) {
    let s1 = word.charAt(i).toLowerCase() 
    let s2 = word.charAt(word.length - i - 1).toLowerCase() 
    if (! ( s1 === s2)) {
       flag = false  
    }
    i++
  }
  return(flag)
}



console.log(isPalindrome("Deleveled"))
