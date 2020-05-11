let maxPrizeAndCost=function (multiple, playtype, arr) {
            var maxPrice = 0;
            var minPrice = 0;
            var _s = [];
            var priceArr = [];
    // if (!_arr) {
    //     return '请检查赔率数组';
    // }
    //
    // if (!multiple) {
    //     return '请检查倍数';
    // }
    //
    // if (!playtype) {
    //     return '请检查过关方式';
    // }

    var _selfs = new Array(playtype);
    var _arr = arr;
    var _where = 0;
    var _total = [];
    var _indexs;
    //判断是那种过关方式
    switch (playtype) {
        case 0:
        break;
        case 1:
        break;
        case 2:
        _indexs = [0, 1];
        break;
        case 3:
        _indexs = [0, 1, 2];
        break;
        case 4:
        _indexs = [0, 1, 2, 3];
        break;
        case 5:
        _indexs = [0, 1, 2, 3, 4];
        break;
        case 6:
        _indexs = [0, 1, 2, 3, 4, 5];
        break;
        case 7:
        _indexs = [0, 1, 2, 3, 4, 5, 6];
        break;
        case 8:
        _indexs = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
    }

    permutation(_selfs, _arr, _indexs, _total, _where);
    for (var i = 0; i < _total.length; i++) {
        var nums = 1;
        for (var m = 0; m < _total[i].length; m++) {
            nums = nums * _total[i][m]
        }
        _s.push((nums * 2).toFixed(2));

    }
    minPrice = Math.min.apply(null, _s);
    for (var i = 0; i < _s.length; i++) {
        maxPrice += _s[i] * 1;
    }
    priceArr.push(minPrice.toFixed(2));
    priceArr.push(maxPrice.toFixed(2));
    return priceArr;
}



function isNotNull(data) {
    if (data != null) {
        return true;
    } else {
        return false;
    }
}

/**
 *	* 串 *
 * @param _selfs    当前的组合[]
 * @param _arr      所有组合的基值[]
 * @param _indexs   当前的组合对应的基值的索引[]
 * @param _total    排列组合结果
 * @param _where    当前排列组合循环的位置
 */
 function permutation(_selfs, _arr, _indexs, _total, _where) {
    if (_selfs != null && isNotNull(_arr) && _arr.length >= _selfs.length) {
        if (_where < _selfs.length - 1) { //非末位
            var index = _indexs[_where];
            if (index == _arr.length) { //非末位末尾
                --_where;
                if (_where == -1) { //首位超出
                    return;
                } else {
                    _indexs[_where] = _indexs[_where] + 1;
                    for (var i = _where + 1; i < _selfs.length; i++) {
                        _indexs[i] = _indexs[i - 1] + 1;
                    }
                    permutation(_selfs, _arr, _indexs, _total, _where);
                }
            } else {
                _selfs[_where] = _arr[index];
                permutation(_selfs, _arr, _indexs, _total, ++_where);
            }
        } else { //末位
            var index = _indexs[_where];
            if (index == _arr.length) { //直接末位末尾
                --_where;
                if (_where == -1) { //末位超出即 单关
                    return;
                }
                _indexs[_where] = _indexs[_where] + 1;
                for (var i = _where + 1; i < _selfs.length; i++) {
                    _indexs[i] = _indexs[i - 1] + 1;
                }
                permutation(_selfs, _arr, _indexs, _total, _where);
            } else {
                _selfs[_where] = _arr[index];
                _total.push(copy.deepCoby(_selfs));
                var _nextIndex = _indexs[_where] + 1;
                if (_nextIndex < _arr.length) {
                    _indexs[_where] = _nextIndex;
                    permutation(_selfs, _arr, _indexs, _total, _where);
                } else { //下一个末位末尾
                    --_where;
                    if (_where == -1) {
                        return;
                    }
                    _indexs[_where] = _indexs[_where] + 1;
                    for (var i = _where + 1; i < _selfs.length; i++) {
                        _indexs[i] = _indexs[i - 1] + 1;
                    }
                    permutation(_selfs, _arr, _indexs, _total, _where);
                }
            }
        }
    }
}

var copy = {
    deepCoby: function(obj) {
        if (null == obj || "object" != typeof obj)
            return obj;
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = this.deepCoby(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCoby(obj[attr]);
            }
            return copy;
        }
        alert("排列数据有误")
    }
}


function pailie(multiple, playtype, arr,numcheng) {

    let _selfs = new Array(numcheng);
    let _arr = arr;
    let _where = 0;
    let _total = [];
	let _indexs;
    //判断是那种过关方式
    switch (numcheng) {
     case 1:
     _indexs = [0];
     break;
     case 2:
     _indexs = [0, 1];
     break;
     case 3:
     _indexs = [0, 1, 2];
     break;
     case 4:
     _indexs = [0, 1, 2, 3];
     break;
     case 5:
     _indexs = [0, 1, 2, 3, 4];
     break;
     case 6:
     _indexs = [0, 1, 2, 3, 4, 5];
     break;
     case 7:
     _indexs = [0, 1, 2, 3, 4, 5, 6];
     break;
     case 8:
     _indexs = [0, 1, 2, 3, 4, 5, 6,7];
     break;
     case 9:
     _indexs = [0, 1, 2, 3, 4, 5, 6,7,8];
     break;
 }

 permutation(_selfs, _arr, _indexs, _total, _where);
 return _total;
}


//单关固赔过关方式 计算预测奖金
function DggpmaxPriceAndCost(multiple,playtype,_arr){
	var maxArr = [];
	var minArr = [];
	var DgminPrice = 0;
	var DgmaxPrice = 0;
    if (playtype == 'DGGP') {
       console.log(_arr);
	//找出数组中最大的和最小的
	for (var i = 0; i < _arr.length; i++) {
      maxArr.push(Math.max.apply(null,_arr[i]));
      minArr.push(Math.min.apply(null,_arr[i]));
  }
	//处理计算最大奖金
	for (var z = 0; z < maxArr.length; z++) {
		DgmaxPrice += maxArr[z]*2*multiple;
	}
	//计算最小奖金


	DgminPrice = Math.min.apply(null,minArr)*2*multiple;

}
return [DgminPrice,DgmaxPrice];
}

// var multiple = 1;
// //串关过关方式
// var _arr = [
//   [2.55,1.14,1.75],//小
//   [2.55,1.14,1.75],//大
//   ];
//
// // var _arr = [
// //  ['7.8'],
// //  ['3.62'],
// //   ['3.62']
//
// // ];
// // var _arr = [["7.16"],["5.95"],["1.95"]] ;
//
//  var playtype = [4,5]; //过关方式.
//
//  var danArr=[
//  [1.41,3.20],//小
//  [1,6,3.20]//大
//  ];

//多种串关方式
let varietymaxPrizeAndCost=function (multiple,playtype,_arr,danArr,numcheng){
   var minBet=0;
   var maxBet=0;
   var DGGPArrBetPirce =[];
   var DGGPArrBetPirces =[];
    var minpriceArr = new Array();
 var maxpriceArr = new Array();
   var danprice = 1;

   var _a = [];
  var _z = [];
   if (danArr.length >0 && playtype != 'DGGP' ) {
         for (var p = 0; p < danArr.length; p++) {
              var danprice = 1;
            for (var m = 0; m < danArr[p].length; m++) {
               danprice*=danArr[p][m];
            }
            _a.push(danprice);
   }
    var pailies = pailie(multiple,playtype,_arr[0],numcheng);
    var pailiess = pailie(multiple,playtype,_arr[1],numcheng);
   for (var j = 0; j < _a.length; j++) {
      var _s = [];
        for (var i = 0; i < pailiess.length; i++) {
         var nums = 1;

        for (var m = 0; m < pailiess[i].length; m++) {
            nums = nums * pailiess[i][m]

        }
             _s.push(nums *2* _a[j].toFixed(2));
    }

    _z.push(_s);
   }

        for (var y = 0;y < _z[1].length; y++) {
          maxBet += parseFloat(_z[1][y]);
        }
        minBet = Math.min.apply(null,_z[0]);
     return [maxBet,minBet]
 }
 if ( playtype.indexOf("DGGP") == 0) {

 	for (var o = 0; o < playtype.length; o++) {
 		if (playtype[o] == 'DGGP') {
 			var Lsr = DggpmaxPriceAndCost(multiple,playtype[o],_arr);
           DGGPArrBetPirce.push(Lsr[0],Lsr[1]);
       }else{
          var mins=[];
          var maxs=[];
          for (var i = 0; i < _arr.length; i++) {
            var max = Math.max.apply(null,_arr[i]);
            var min = Math.min.apply(null,_arr[i]);
            mins.push(min);
            maxs.push(max);
        }
        var _arrs=[];
        _arrs.push(mins);
        _arrs.push(maxs);

        minpriceArr.push(maxPrizeAndCost(multiple,playtype[o],_arrs[0]));

        minBet=parseFloat(minpriceArr[0][0]);
        maxpriceArr.push(maxPrizeAndCost(multiple,playtype[o],_arrs[1]));
        maxBet+=parseFloat(maxpriceArr[0][1]);

    }

}
if (playtype.length == 1 && playtype[0] == 'DGGP') {
  return [Math.min.apply(null,DGGPArrBetPirce),Math.max.apply(null,DGGPArrBetPirce)];
}else{
  DGGPArrBetPirce.push(minBet,maxBet);
  return [Math.min.apply(null,DGGPArrBetPirce),Math.max.apply(null,DGGPArrBetPirce)];
}
}else {
 for (var r = 0; r < playtype.length; r++) {
   minpriceArr.push(maxPrizeAndCost(multiple,playtype[r],_arr[0]));
}

for (var i = 0; i < minpriceArr.length; i++) {
   minBet=parseFloat(minpriceArr[0][0]);
}

for (var z = 0; z < playtype.length; z++) {
   maxpriceArr.push(maxPrizeAndCost(multiple,playtype[z],_arr[1]));
}

for (var w = 0; w < maxpriceArr.length; w++) {
  maxBet+=parseFloat(maxpriceArr[w][1]);
}
return [minBet,maxBet];
}

}

let danmaxPrizeAndCost=function (multiple,playtype,_arr,danArr){
    var minBet=0;
    var maxBet=0;
    var danyuce = [];

    for (var i = 0; i < playtype.length; i++) {
        var numcheng =  playtype[i] - danArr[0].length;
        danyuce.push(varietymaxPrizeAndCost(multiple,playtype[i],_arr,danArr,numcheng))
    }
    for (var i = 0; i < danyuce.length; i++){
               minBet=parseFloat(danyuce[0][1]);
               maxBet+=parseFloat(danyuce[i][0]);
    }
      return [minBet,maxBet]
}


// danmaxPrizeAndCost(multiple,playtype,_arr,danArr,numcheng);有胆的时候第五个参数固定为空数组
//varietymaxPrizeAndCost(multiple,playtype,_arr,danArr,numcheng);没胆的时候 第五个参数固定为空
export {varietymaxPrizeAndCost,danmaxPrizeAndCost}