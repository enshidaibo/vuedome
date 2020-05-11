/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
// import Aes from '@/js/aes.js'
import CryptoJS from 'crypto-js/crypto-js'

CryptoJS.pad.ZeroPadding={pad:function(a,c){var b=4*c;a.clamp();a.sigBytes+=b-(a.sigBytes%b||b)},unpad:function(a){for(var c=a.words,b=a.sigBytes-1;!(c[b>>>2]>>>24-8*(b%4)&255);)b--;a.sigBytes=b+1}};


export function encrypt(arr) {
    //密钥16位
    var str=JSON.stringify(arr);
    var key = CryptoJS.enc.Utf8.parse('1559136634561WZH');
    //加密向量16位
    var iv = CryptoJS.enc.Utf8.parse('ZZWBKJ_ZHIHUAWEI');
    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}
