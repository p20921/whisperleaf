// 외부에서 <form></form> 사용하여 값을 요청할때 막는 middleware
function sameOriginPolicy(req) {
    if (!req) return false


    console.log(req.headers.origin, process.env.ORIGIN, process.env.WWW_ORIGIN )

    return req.headers.origin === process.env.ORIGIN || req.headers.origin === process.env.WWW_ORIGIN 
}

export default sameOriginPolicy