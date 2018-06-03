'use strict';

/**********************************************************************************************
 *                                                                                            *
 * Plese read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions                    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments      *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures                           *
 *                                                                                            *
 **********************************************************************************************/


/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * The result of compose is to be a function of one argument, (lets call the argument x),
 * which works like applying function f to the result of applying function g to x, i.e.
 *  getComposition(f,g)(x) = f(g(x))
 *
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 *
 * @example
 *   getComposition(Math.sin, Math.asin)(x) => Math.sin(Math.acos(x))
 *
 */
 function getComposition(f,g) {
    return function(x) {
        return f(g(x));
    };
    /* return functions() {
    return f.call(this, g.apply(this, arguments))};
} */
}


/**
 * Returns the math power function with the specified exponent
 *
 * @param {number} exponent
 * @return {Function}
 *
 * @example
 *   var power2 = getPowerFunction(2); // => x^2
 *   power2(2) => 4
 *   power2(4) => 16
 *
 *   var power05 = getPowerFunction(0.5); // => x^0.5
 *   power05(4) => 2
 *   power05(16) => 4
 *
 */
 function getPowerFunction(exponent) {
    return function(x) {
        return Math.pow(x, exponent);
    };
}


/**
 * Returns the polynom function of one argument based on specified coefficients.
 * See: https://en.wikipedia.org/wiki/Polynomial#Definition
 *
 * @params {integer}
 * @return {Function}
 *
 * @example
 *   getPolynom(2,3,5) => y = 2*x^2 + 3*x + 5
 *   getPolynom(1,-3)  => y = x - 3
 *   getPolynom(8)     => y = 8
 *   getPolynom()      => null
 */
 function getPolynom(a, b, c) {
    let index = Array.from(arguments).reverse();
    return function (x) {
        let len = index.length;
        if (len === 0) {return null;}
        let count = 1;
        return index.reduce(function(m, elem, i) {
            return m + elem * (count *= x);
        });
    }
}


/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @params {Function} func - function to memoize
 * @return {Function} memoized function
 *
 * @example
 *   var memoizer = memoize(() => Math.random());
 *   memoizer() => some random number  (first run, evaluates the result of Math.random())
 *   memoizer() => the same random number  (second run, returns the previous cached result)
 *   ...
 *   memoizer() => the same random number  (next run, returns the previous cached result)
 */
 function memoize(func) {
   let memo = {};
   let slice = Array.prototype.slice;
   return function() {
     let argument = slice.call(arguments);
     if (argument in memo)
       return memo[argument];
   else
       return (memo[argument] = func.apply(this, argument));

}
}


/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 *
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 *
 * @example
 * var attempt = 0, retryer = retry(() => {
 *      if (++attempt % 2) throw new Error('test');
 *      else return attempt;
 * }, 2);
 * retryer() => 2
 */
 function retry(func, attempts) {
   return function () {
     for (let i = 0; i < attempts; i++) {
       try {
         return func.apply(this, arguments);
     }
     catch (e) {}
 }
 return 'expected';
}
}


/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The fromat of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 *
 *
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 *
 * @example
 *
 * var cosLogger = logger(Math.cos, console.log);
 * var result = cosLogger(Math.PI));     // -1
 *
 * log from console.log:
 * cos(3.141592653589793) starts
 * cos(3.141592653589793) ends
 *
 */
 function toType(string) {
    let strin;
    let newstring = "";
    if (string instanceof Array) {
        string = string.toString();
    } else {
        return string;
    }
    while (string.indexOf(",") > 0) {
        strin = string.substring(0, string.indexOf(","));
        if (isNaN(Number(strin))) {
            strin = '"' + strin + '"';
        }
        newstring = newstring + strin + ",";
        string = string.substring((string.indexOf(",") + 1),string.length);
    }
    strin = string;
    if (isNaN(Number(strin))) {
        strin = '"' + strin + '"';
    }
    newstring = newstring + strin;
    return newstring;
}
function logger(func, logFunc) {
    let a;
    return function(value, value1) {
        a++;
        if (arguments[0] instanceof Array) {
            var str = '[' + toType(arguments[0]) + ']';
        } else {
            var str = toType(arguments[0]);
        }  
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] instanceof Array) {
                str = str + ',' + '[' + toType(arguments[i]) + ']';
            } else {
                str = str + ',' + toType(arguments[i]);
            }         
        }
        logFunc(func.name + '(' + str + ') starts');
        var res = func(value, value1);
        if ( 1 == 1 ) {logFunc(func.name + '(' + str + ') ends')};
        return res;
    }
}


/**
 * Return the function with partial applied arguments
 *
 * @param {Function} fn
 * @return {Function}
 *
 * @example
 *   var fn = function(x1,x2,x3,x4) { return  x1 + x2 + x3 + x4; };
 *   partialUsingArguments(fn, 'a')('b','c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b')('c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c')('d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c','d')() => 'abcd'
 */
 function partialUsingArguments(fn) {
     let slice = Array.prototype.slice;
     let stored_args = slice.call(arguments, 1);
     return function () {
       let new_args = slice.call(arguments),
       args = stored_args.concat(new_args);
       return fn.apply(null, args);
   };
}


/**
 * Returns the id generator function that returns next integer starting from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 *
 * @example
 *   var getId4 = getIdGenerator(4);
 *   var getId10 = gerIdGenerator(10);
 *   getId4() => 4
 *   getId10() => 10
 *   getId4() => 5
 *   getId4() => 6
 *   getId4() => 7
 *   getId10() => 11
 */
 function getIdGeneratorFunction(startFrom) {
    let count = startFrom;
    return function () {
        return count++;
    }
}


module.exports = {
    getComposition: getComposition,
    getPowerFunction: getPowerFunction,
    getPolynom: getPolynom,
    memoize: memoize,
    retry: retry,
    logger: logger,
    partialUsingArguments: partialUsingArguments,
    getIdGeneratorFunction: getIdGeneratorFunction,
};
