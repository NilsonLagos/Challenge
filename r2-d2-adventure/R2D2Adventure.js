const { Hero, Character  } = require('./Characters');
const { getRandomCoordinate, getEmptyRandomCoordinate, getRandomNumberFromRange, directions, 
        verifyNumberType, terminateProcessWithLog, areArraysEqual } = require('./Utils');

class R2D2Adventure {
    constructor(){
        this.RD2D = new Hero('RD-D2');
        this.ObiWan = new Character('Obi Wan Kenobi');
        this.landed = false;
    }

    land(){
        if(this.landed){
            console.log('R2D2 and Obi Wan Kenobi are already on the planet');
            return;
        }
        const r2d2RandomCoordinates = getRandomCoordinate(100, 100);
        const r2d2RandomFacingDirection = getRandomNumberFromRange(0, 3);
        let obiWanRandomCoordinates = getEmptyRandomCoordinate(r2d2RandomCoordinates, 100, 100);
        this.RD2D.setCoordinates(r2d2RandomCoordinates);
        this.RD2D.setFacingDirection(r2d2RandomFacingDirection);
        this.ObiWan.setCoordinates(obiWanRandomCoordinates);
        this.landed = true;
        this.report();
    }

    report(){
        if(!this.validateIfLandWasPerformed()) return;
        console.log(`${ this.RD2D.name } is at ${ this.RD2D.coordinates[0] },${ this.RD2D.coordinates[1] } facing ${ directions[this.RD2D.facingDirection].name }`);
        console.log(`${ this.ObiWan.name } is at ${ this.ObiWan.coordinates[0] },${ this.ObiWan.coordinates[1] }`);
    }
    
    move(cells){
        if(!this.validateIfLandWasPerformed()) return;
        if(verifyNumberType(cells) && cells > 0){
            const direction = directions[this.RD2D.facingDirection];
            //Coordinate structure [x, y]
            let newCellCoordinatePart = this.RD2D.coordinates[direction.isXDirection ? 0 : 1];
            //North and east require the value to be added, West and South substracted
            newCellCoordinatePart += direction.positive ?  cells : - cells;
            //Grid goes from positions 0-99
            if(newCellCoordinatePart > 99 || newCellCoordinatePart < 0){
                console.log('The force is preventing you from performing this action, as it would have resulted in R2D2 falling from the planet.');
                return;
            }
            this.RD2D.coordinates[direction.isXDirection ? 0 : 1] = newCellCoordinatePart;
            if(areArraysEqual(this.RD2D.coordinates, this.ObiWan.coordinates)) 
                terminateProcessWithLog(`Congratulations, you've saved the Rebellion!`);
        }
        else{
            console.log('Invalid value provided, must be a number greater than 0');
        }
    }

    left(){
        if(!this.validateIfLandWasPerformed()) return;
        this.RD2D.rotateLeft();
    }

    right(){
        if(!this.validateIfLandWasPerformed()) return;
        this.RD2D.rotateRight();
    }    

    validateIfLandWasPerformed(){
        if(!this.landed){
            console.log(`Can't perform this action if LAND has not been called`);
        }
        return this.landed;
    }
}


module.exports = { R2D2Adventure }