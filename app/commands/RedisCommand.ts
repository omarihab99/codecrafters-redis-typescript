import {Command} from "./Command";

export default abstract class RedisCommand { 
    constructor(public name: Command, public argsList: string[] = []) {}
    get length(){
        return this.argsList.length;
    }
    execute() : string {
        return this.implement();
    }
    abstract implement() : string;
}