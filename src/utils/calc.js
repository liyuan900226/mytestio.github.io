/**
 * 精确计算加减乘除，解决浮点数计算出现误差的问题
 * 这里提供的方法都只是对于两个数之间的操作，如果是多个数字之间的操作，请自行处理兼容
 *
 * 加减乘除方法的核心：先获取最大小数位，然后将数的小数位补齐，后去除小数位然后操作
 *
 * 包含的方法：
 * 1. 加法
 * 2. 减法
 * 3. 乘法
 * 4. 除法
 * 5. 保留指定位数的小数
 */

// 获取扩大的指数值
const getPowNum = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const arg1Arr = arg1.toString().split('.');
    const arg2Arr = arg2.toString().split('.');
    let arg1DotLen = 0;
    let arg2DotLen = 0;
    arg1Arr.length === 2 && (arg1DotLen = arg1Arr[1].length);
    arg2Arr.length === 2 && (arg2DotLen = arg2Arr[1].length);
    return arg1DotLen + arg2DotLen;
};

/**
 * 保留指定位数的小数（注意：不是四舍五入，而是直接保留某些小数）
 * @param { Number | String } arg1 第一个参数
 * @param { Number | String } arg2 保留小数的位数
 */
export const calcFixed = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const arg1Arr = arg1.toString().split('.');
    let ele1 = '';
    if (arg1Arr.length === 2) {
        ele1 = arg1Arr[1].toString();
    }
    if (ele1.length >= arg2) {
        ele1 = ele1.substr(0, arg2);
    } else {
        for (let i = ele1.length; i < arg2; i++) {
            ele1 += '0';
        }
    }
    arg1Arr[1] = ele1;
    return arg1Arr.join('.');
};

/**
 * 加法
 * @param { Number | String } arg1 第一个参数
 * @param { Number | String } arg2 第二个参数
 */
export const calcAdd = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const powLen = getPowNum(arg1, arg2);
    arg1 = calcFixed(arg1, powLen).replace('.', '');
    arg2 = calcFixed(arg2, powLen).replace('.', '');
    const powNum = Math.pow(10, powLen);
    return (arg1 + arg2) / powNum;
};

/**
 * 减法
 * @param { Number | String } arg1 第一个参数
 * @param { Number | String } arg2 第二个参数
 */
export const calcSub = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const powLen = getPowNum(arg1, arg2);
    arg1 = calcFixed(arg1, powLen).replace('.', '');
    arg2 = calcFixed(arg2, powLen).replace('.', '');
    const powNum = Math.pow(10, powLen);
    return (arg1 - arg2) / powNum;
};

/**
 * 乘法
 * @param { Number | String } arg1 第一个参数
 * @param { Number | String } arg2 第二个参数
 */
export const calcMul = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const powLen = getPowNum(arg1, arg2);
    arg1 = calcFixed(arg1, powLen).replace('.', '');
    arg2 = calcFixed(arg2, powLen).replace('.', '');
    const powNum = Math.pow(10, powLen * 2);
    return (arg1 * arg2) / powNum;
};

/**
 * 除法
 * @param { Number | String } arg1 第一个参数
 * @param { Number | String } arg2 第二个参数
 */
export const calcDiv = function(arg1, arg2) {
    if (isNaN(arg1) || isNaN(arg2)) return 0;
    const powLen = getPowNum(arg1, arg2);
    arg1 = calcFixed(arg1, powLen).replace('.', '');
    arg2 = calcFixed(arg2, powLen).replace('.', '');
    return arg1 / arg2;
};
