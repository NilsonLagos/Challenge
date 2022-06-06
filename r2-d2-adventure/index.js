const inquirer = require('inquirer');
const { R2D2Adventure } = require('./R2D2Adventure');

const acceptableCommands = ["LAND", "MOVE", "LEFT", "RIGHT", "REPORT"];

(async () => {
    console.log(`The year is 1977, Star Wars: A New Hope has just been released. The true hero of the film, R2-D2 has acquired Death Star plans and needs to deliver them to Obi Wan Kenobi on the surface of Tatooine to help ensure victory for the rebellion. The problem is that upon landing R2-D2 has lost all autonomy and needs your to help guide him safely to Obi Wan Kenobi through manual commands.`)
    //When the goal is fullfilled the application will be terminated as stated on the requirements
    const adventure = new R2D2Adventure();
    while(true){
        const userInteraction = await inquirer.prompt({"name": 'command',"message": 'Acceptable Commands: LAND, MOVE (X), LEFT, RIGHT, REPORT'});
        const splitted = userInteraction.command.split(" ");
        const command = splitted[0].toUpperCase();
        //used for move function
        const cells = splitted[1];
        if(acceptableCommands.includes(command)){
            //only move command should have a cells value
            if(command !== "MOVE" && !!cells){
                console.log("Only MOVE command accept additional parameters");
                continue;
            }
            switch(command){
                case 'LAND':
                    adventure.land();
                    break;
                case 'MOVE':
                    adventure.move(parseInt(cells));
                    break;
                case 'LEFT':
                    adventure.left();
                    break;
                case 'RIGHT':
                    adventure.right();
                    break;
                case 'REPORT':
                    adventure.report();
                    break;
            }
        }
        else{
            console.log('Invalid command');
        }
    }
})();

