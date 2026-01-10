export const accessTokenCookie={
    httpOnly:true,
    secure:true,
    sameSit:"strict",
    maxAge:15*60*1000
};

export const refreshTokenCookie={
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge:7*24*60*60*1000
};