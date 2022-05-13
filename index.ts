import { getObstacleEvents } from './computer-vision';

//types
//type for autonomous car
interface AutonomousCar {
    isRunning?: boolean;
    respond: (events: Events) => void;

}
// type for the props in the constructor method
interface AutonomousCarProps {
    isRunning?: boolean;
    //required type for steeringControl
    steeringControl: Steering;
}

//type for the returned value of getObstacleEvents() function
interface Events{
    [obstacle: string]: boolean;
}

//type for steering / controlling the car
interface Control{
    execute: (command: string) => void;
}
interface Steering extends Control{
    turn: (direction: string) => void;
}

// classes
class Car implements AutonomousCar {
    isRunning;
    steeringControl;

    //constructor method
    constructor(props: AutonomousCarProps){
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }

    //respond method to respond to events
    respond(events: Events){
        if(this.isRunning){
            let eventKeys = Object.keys(events);
            eventKeys.forEach((eventKey) => {
                if(!events[eventKey]){
                    return;
                }
                if(eventKey == "ObstacleLeft"){
                    this.steeringControl.turn('right');
                } else if(eventKey == "ObstacleRight"){
                    this.steeringControl.turn('left');
                }
            })
        } else {
            return console.log('The car is off!');
        }
    }
}

//class for steering and control
class SteeringControl implements Steering {
    execute(command: string){
        console.log(`Executing: ${command}`);
    }

    turn(direction: string){
        this.execute(`turn ${direction}`);
    }
}


// code execution
//test variable for steering control class
const steering = new SteeringControl;
//steering.turn('right');

//variable for new Car instance
// include the props for constructor and use the steering variable above as the instance of that class within the car class
const autonomousCar = new Car({isRunning: true, steeringControl: steering});
autonomousCar.respond(getObstacleEvents());
