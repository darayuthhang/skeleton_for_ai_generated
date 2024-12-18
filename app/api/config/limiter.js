import { RateLimiter} from 'limiter';
//three token per minute
//60 request per hour
export const limiter = new RateLimiter({
    tokensPerInterval: 100,
    interval:"second",
    fireImmediately:true //my it asyncho and remove token immediately
})

export const rateLimitMiddlware = async (res) => {
    const remaining = await limiter.removeTokens(1);

    if (remaining < 0) {
        return res.json({ success: false }, {
            status: 429,
            error: "Too Many Request",
            // headers:{
            //     'Access-Control-Allow-Origin': origin || '*',
            //     'Content-Type': "text/plain"
            // }
        });
    }
}

export const rateLimitStripe = new RateLimiter({
    tokensPerInterval: 10,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimitSub = new RateLimiter({
    tokensPerInterval: 10,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimitUnSub = new RateLimiter({
    tokensPerInterval: 10,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})



export const rateLimitUpdatePaymentStatus = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})

export const rateLimitPromptDashboard = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimistImageList = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimitFeedBck = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimitUpload = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
export const rateLimitDownload = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})


export const rateLimitNameGenerator = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})



export const rateLimitTiktokGenerator = new RateLimiter({
    tokensPerInterval: 100,
    interval: "second",
    fireImmediately: true //my it asyncho and remove token immediately
})
