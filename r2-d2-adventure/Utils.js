
const verifyNumberType = _value => typeof _value === 'number' && !isNaN(_value);
const verifyString = _value => typeof _value === 'string' && _value.length > 0;
const areArraysEqual = (_a, _b) => _a.length === _b.length && _a.every((v, i) => v === _b[i]);
const verifyArray = _array => !!(Array.isArray(_array) && _array.length);
const getRandomNumberFromRange = (_min, _max) => Math.floor(Math.random() * (_max + 1 - _min)) + _min;
const verifyCoordinateIsValid = _coordinates => 
    verifyArray(_coordinates) 
    && _coordinates.length === 2 
    && verifyNumberType(_coordinates[0]) 
    && verifyNumberType(_coordinates[1]);

function getEmptyRandomCoordinate(_occupiedCoordinate, _xSize, _ySize){
    isCoordinateValid = verifyCoordinateIsValid(_occupiedCoordinate);
    const randomCoordinate = getRandomCoordinate(_xSize, _ySize);
    if(isCoordinateValid){
        if(areArraysEqual(_occupiedCoordinate, randomCoordinate)) {
            return getEmptyRandomCoordinate(_occupiedCoordinate,_xSize, _ySize);
        }
    }
    else{
        console.log('Received a invalid occupied coordinate, we are assuming there are no occupied coordinates, occipiedCoordinate:', _occupiedCoordinate);
    }
    return randomCoordinate;
}

function getRandomCoordinate(_xSize, _ySize){
    //if we have invalid sizes then we are defaulting to 99 for a 100x100 grid
    //we remove 1 to allow passing 100, 100 and stil stay in range of a 100 array [0-99]
    const validXMax = verifyNumberType(_xSize) && _xSize > 0 ? _xSize - 1 : 99;
    const validYMax = verifyNumberType(_ySize) && _ySize > 0 ? _ySize - 1 : 99;
    const x = getRandomNumberFromRange(0, validXMax);
    const y = getRandomNumberFromRange(0, validYMax);
    return [x, y];
}

function terminateProcessWithLog(...args){
    console.log(...args);
    process.exit();
}

const directions = [
    { name: 'North', positive: true, isXDirection: false },
    { name: 'East', positive: true, isXDirection: true },
    { name: 'South', positive: false, isXDirection: false },
    { name: 'West', positive: false, isXDirection: true },
]

module.exports = {
    verifyArray,
    verifyNumberType,
    areArraysEqual,
    getRandomNumberFromRange,
    getRandomCoordinate,
    getEmptyRandomCoordinate,
    verifyString,
    verifyCoordinateIsValid,
    terminateProcessWithLog,
    directions,
}