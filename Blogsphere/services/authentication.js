const JWT = require("jsonwebtoken")
const secret = "@Shinchan123"

function createTokenForUser(user){
    const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role,
        profileImageURL:user.profileImageUrl,
    }
    const token = JWT.sign(payload, secret);
    return token;
}
 
function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
};