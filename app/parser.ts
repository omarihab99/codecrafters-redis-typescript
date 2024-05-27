import decode from './decoder';
import RedisQueue from './RedisQueue';
const parse = (data: string) => {
    const commands = decode(data);    
    const queue = new RedisQueue();
    commands.forEach(command => {
        queue.push(command);
    });
    return queue;
}

export default parse;
