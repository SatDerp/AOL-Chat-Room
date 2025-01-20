const config = {
    // all times in milliseconds
    requestsPer: 100, // 100 requests per
    timeLimit: 60 * 1000, // 1 minute
    timeoutMultiplier: 6000, // strikes * timeoutMultiplier = ipTimeoutUntil Date
};

const ipRatelimits = new Map(); // Map<string, { count: number, resetTime: Date, strikes: number }>
const ipTimeoutUntil = new Map(); // Map<string, Date>

function addTimeoutMultiplier(date, strikes) {
    return new Date(date.getTime() + strikes * config.timeoutMultiplier);
}

export default function test(ip) {
    const now = new Date();

    const timeoutUntil = ipTimeoutUntil.get(ip);
    if (timeoutUntil && now < timeoutUntil) {
        return false; // IP is still in timeout
    }

    let ipMap = ipRatelimits.get(ip);

    if (!ipMap) {
        ipRatelimits.set(ip, {
            count: 1,
            resetTime: new Date(now.getTime() + config.timeLimit),
            strikes: 0,
        });
        return true; // New IP
    }

    if (now > ipMap.resetTime) {
        ipMap.count = 1;
        ipMap.resetTime = new Date(now.getTime() + config.timeLimit);
        ipRatelimits.set(ip, ipMap);
        return true; // Reset rate limit
    }

    ipMap.count++;
    if (ipMap.count > config.requestsPer) {
        ipMap.strikes++;
        ipTimeoutUntil.set(ip, addTimeoutMultiplier(now, ipMap.strikes));
        ipRatelimits.set(ip, { ...ipMap, count: 0 });
        return false; // Blocked due to exceeding limit
    }

    ipRatelimits.set(ip, ipMap);
    return true; // Allowed request
}