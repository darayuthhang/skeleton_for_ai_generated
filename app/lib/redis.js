import Redis from 'ioredis';
import {Queue } from 'bullmq';


const redisConfig = {
    port: 16696,          // Replace with your port number
    host: process.env.NEXT_PUBLIC_REDIS_HOST_URL,   // Replace with your host
    password: process.env.NEXT_PUBLIC_REDIS_PASS,
}
const connection = new Redis(redisConfig);

export const getCacheValue = async (key) => {
    // Implement logic to generate a unique key based on jobData
    let value = await connection.get(key);
    return value ? JSON.parse(value) : null;
};
export const setCache = async (key, dataObject, expirationTime) => {
    await connection.set(key, JSON.stringify(dataObject), 'EX', expirationTime);
}

export const deleteCacheKey = async (key) => {
    await connection.del(key);
};

export const AlertNewsQueue = new Queue('AlertNewsQueue', {
    connection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
    },
});
// export const queue = new Queue('paint', { connection });

export const removeDailyUpdateAlert = async (stockAlertId) => {
    const repeatJob = await AlertNewsQueue.getRepeatableJobs();
    if (repeatJob && repeatJob.length > 0) {
        const keys = repeatJob
            .filter(val => val?.name === stockAlertId) // First, filter out the objects that meet your condition
            .map(val => val?.key); // Then, map to get their keys

        if (keys.length > 0) {
            await AlertNewsQueue.removeRepeatableByKey(keys[0]);
        }
    }
}
