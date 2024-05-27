import decode from './decoder';
import RedisQueue from './RedisQueue';
const parse = (data: string) => decode(data);
const createQueue = (commands: string[][]) => {
    const queue = new RedisQueue();
    commands.forEach(command => {
        queue.push(command);
    });
    return queue;
}

export { parse, createQueue };
