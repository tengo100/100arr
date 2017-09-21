/**
 * Created by 100 on 2017/9/21.
 */
(function(root, factory) {
    if(typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = factory(root.$arr);
    } else if(typeof define === "function" && define.amd) {
        define(["$arr"], function($arr) {
            return(root.$arr = factory($arr));
        });
    } else {
        root.$arr = factory(root.$arr);
    }
}(this, function($arr) {
    $arr = {
        version: "1.0.0",
        name:"100",
        check: function(arr) {
            if(!Array.isArray(arr)){
                throw "arguments type error!";
            }
        },
        one:function(arr){
            this.check(arr);
            return arr.filter(function(el,i,arr){
                return arr.indexOf(el)===arr.lastIndexOf(el);
            });
        },
        shuffle:function(arr){
            return arr.sort(function(){return Math.random()-0.5});
        },
        max:function(arr){
            return Math.max.apply(null,arr);
        },
        min:function(arr){
            return Math.min.apply(null,arr);
        },
        deduped:function(arr){
            return arr.filter(function(el,i,arr){
               return arr.indexOf(el)===i;
            });
        }
    };
    return $arr;
}));

