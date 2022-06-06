const { verifyCoordinateIsValid, verifyString, terminateProcessWithLog, verifyNumberType } = require('./Utils');

class Character {
    coordinates = [];
    name = "";

    constructor(_name){
        if(verifyString(_name)){
            this.name = _name;
        }
        else{
            terminateProcessWithLog('received an invalid name:', _name);
        }
    }

    setCoordinates(_coordinates){
        if(verifyCoordinateIsValid(_coordinates)){
            this.coordinates = _coordinates;
        }
        else{
            terminateProcessWithLog('received an invalid coordinate:', _coordinates);
        }
    }
}

class Hero extends Character{
    facingDirection = 0;

    constructor(_name){
        super(_name);
    }

    setFacingDirection(_facingDirection){
        //only 4 directions available
        if(verifyNumberType(_facingDirection) && _facingDirection >= 0 && _facingDirection <= 3){
            this.facingDirection = _facingDirection;
        }
        else{
            terminateProcessWithLog('received an invalid direction:', _facingDirection);
        }
    }

    //4 directions, if we are in position 3 (in this case [West]) then instead of adding 1
    //we need to go back to 0 (in this case [North])
    rotateRight = () =>
        this.facingDirection = this.facingDirection < 3 ? this.facingDirection + 1 : 0;
    
    //4 directions, if we are in position 0 (in this case [West]) then instead of substracting 1
    //we need to go back to 3 (in this case [West])
    rotateLeft = () =>
        this.facingDirection = this.facingDirection > 0 ? this.facingDirection - 1 : 3;


}

module.exports = {
    Character, 
    Hero
}