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
        //不重复的元素 $arr.one([1,2,2,3,3,4]) === [1,4]
        one:function(arr){
            return arr.filter(function(el,i,arr){
                return arr.indexOf(el)===arr.lastIndexOf(el);
            });
        },
        //洗牌
        shuffle:function(arr){
            return arr.sort(function(){return Math.random()-0.5});
        },
        //最大值  $arr.max([1,2,5,1,3,10]) === 10
        max:function(arr){
            return Math.max.apply(null,arr);
        },
        //最小值  $arr.min([1,2,5,1,3,10]) === 1
        min:function(arr){
            return Math.min.apply(null,arr);
        },
        //元素去重复  $arr.deduped([1,1,2,2,3,3]) ===  [1,2,3]
        deduped:function(arr){
            return arr.filter(function(el,i,arr){
               return arr.indexOf(el)===i;
            });
        },
        //两个数组都包含的元素  $arr.inter([1,2,3],[1,2,5]) === [1,2]
        inter:function(a,b){
            return a.filter(function(x) { return b.indexOf(x) != -1; });
        },
        //两个数组不同的元素  $arr.diff([1,2,3],[1,2,5]) === [3,5]
        diff:function(a,b){
            return a.filter(function(x) { return b.indexOf(x) == -1; }).concat(b.filter(function(x) { return a.indexOf(x) == -1; }));
        },
        //统计数组中各个元素的个数  $arr.count(['dog','cat','mouse','dog','cat','cat']) === {'dog':2,'cat':3,'mouse':1}
        count:function(arr){
            return arr.reduce(function(prev,next){
                prev[next]=(prev[next]+1)||1;
                return prev;
            },{})
        }
    };
    return $arr;
}));

