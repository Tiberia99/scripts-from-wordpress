// ==UserScript==
// @name eBay Sold Listings Price Calculator
// @namespace https://sblevine.wordpress.com/software/ebay-userscript
// @version 1.5
// @description Calculates the current going sale price of sold items. Technically, calculates the average, median, and IQR prices. Only works on the items displayed on the page. Tip: Set page to display 200 items, sorted by End Time (Recent).
// @match https://www.ebay.com/sch/*LH_Sold=1*
// @includes https://www.ebay.com/sch/*LH_Sold=1*
// @copyright 2014-2020, Steven Levine
// ==/UserScript==
 
(function (){
 
//variables
var dump = document.querySelectorAll(".srp-river-results .s-item__price");
var prices = [];
var total = 0.0;
var average = 0.0;
var median = 0.0;
var first_quartile = 0.0;
var third_quartile = 0.0;
//var mode = 0.0;
//var mode_count = 0;
//var map = {}; //frequency map (for mode)
 
 
console.log(dump);
 
//average
for(var i = 0; i < dump.length; i++)
{
prices[i] = parseFloat(dump[i].innerText.replace(/[^0-9.-]+/g, '')); //remove dollar sign
total = total + prices[i];
}
 
console.log(prices);
console.log(total);
 
average = total/prices.length;
average = Math.round(average*100)/100; //round to 2 decimal places
 
//median
prices.sort(function(a,b){return a-b});
 
console.log(prices);
 
if (prices.length%2==0){
 
median = prices[parseInt(prices.length/2)];
}
 
else //if odd, take avg of 2 middle numbers
{
median = parseFloat((prices[parseInt(prices.length/2)] + prices[parseInt(prices.length/2)+1])/2);
}
 
median = Math.round(median*100)/100; //round to 2 decimal places
 
console.log(median);
 
//Q1 (25th percentile) //not statistically accurate, but good enough
first_quartile = Math.round(prices[parseInt(Math.round(prices.length*0.25))]*100)/100;
 
console.log(first_quartile);
 
//Q3 (75th percentile) //not statistically accurate, but good enough
third_quartile = Math.round(prices[parseInt(Math.round(prices.length*0.75))-1]*100)/100;
 
console.log(third_quartile);
 
//mode (rounded to nearest $5)
//commented out because logic error, and not that useful anyways
//if there are multiple values of same commonness, returns first
//for(i = 0; i < dump.length; i++) // { // prices[i] = 5*(Math.round((prices[i])/5)); // var p = prices[i] // if(map[p]==null) // map[p]=1; // else map[p] = map[p]+1; // } // for(var key in map){ // if(map.hasOwnProperty(key) && map[key] > mode_count){
// mode = key;
// mode_count = map[key];
// }
// }
 
//print (uncomment first line, and comment last line, for a more detailed output)
//alert(‘The average price is: $'+average+'\nThe median price is: $'+median+'\nThe interquartile range is: $'+first_quartile+' – $'+third_quartile);
// +'\nThe most common price (mode) is: $'+mode);
 
alert('The going sale price for this item is $'+median+',\nwith an expected range from $'+first_quartile+' – $'+third_quartile);
 
})();
