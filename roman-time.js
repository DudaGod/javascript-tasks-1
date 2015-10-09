'use strict';

var hours = Number(process.argv[2]);
var minutes = Number(process.argv[3]);

var romanNum = {
    0: [
        '        ',
        '        ',
        '        ',
        '####### ',
        '        ',
        '        ',
        '        '
    ],
    1: [
        '#### ',
        ' ##  ',
        ' ##  ',
        ' ##  ',
        ' ##  ',
        ' ##  ',
        '#### '
    ],
    5: [
        '##     ## ',
        '##     ## ',
        '##     ## ',
        '##     ## ',
        ' ##   ##  ',
        '  ## ##   ',
        '   ###    '
    ],
    10: [
        '##     ## ',
        ' ##   ##  ',
        '  ## ##   ',
        '   ###    ',
        '  ## ##   ',
        ' ##   ##  ',
        '##     ## '
    ],
    50: [
        '##       ',
        '##       ',
        '##       ',
        '##       ',
        '##       ',
        '##       ',
        '######## '
    ],
    colon: [
        '    ##     ',
        '   ####    ',
        '    ##     ',
        '           ',
        '    ##     ',
        '   ####    ',
        '    ##     '
    ]
};

var arabicNum = [1, 5, 10, 50];

if (isTimeValid(hours, minutes)) {
    var romanTime = parseToRomanNum(hours).concat('colon', parseToRomanNum(minutes));

    renderToASCII(romanTime);
}

/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {boolean}
 */
function isTimeValid(hours, minutes) {
    if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return true;
    }

    console.log('ERORR, you wrote incorrect time!');
    return false;
}

/**
 * Parse Arabic number to Roman number but expressed in Arabic numbers
 * @param {Number} number
 * @returns {Array}
 */
function parseToRomanNum(number) {
    var result = [];

    if (!number) {
        result.push(0);
        return result;
    }

    for (var i = arabicNum.length - 1; i >= 0; i--) {
        var j = i - 2 + i % 2;
        while (number >= arabicNum[i]) {
            number -= arabicNum[i];
            result.push(arabicNum[i]);
        }
        if (j >= 0 && (number / (arabicNum[i] - arabicNum[j])) >= 1) {
            number -= arabicNum[i] - arabicNum[j];
            result.push(arabicNum[j], arabicNum[i]);
        }
    }
    return result;
}

/**
 * @param {Array} romanTimeArr
 */
function renderToASCII(romanTimeArr) {
    var length = romanNum[romanTimeArr[0]].length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < romanTimeArr.length; j++) {
            process.stdout.write(romanNum[romanTimeArr[j]][i]);
        }
        process.stdout.write('\n');
    }
}
