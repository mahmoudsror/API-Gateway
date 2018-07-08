const validator = require('validator');
require('dotenv').config()

if(validator.isIn('PAGE_ACCESS_TOKEN',process.env)){
    if(validator.isEmpty(process.env.PAGE_ACCESS_TOKEN)){
        throw new Error('PAGE_ACCESS_TOKEN is empty!')
    }
}else {
    throw new Error('PAGE_ACCESS_TOKEN Is missing in .env !')
}

if(validator.isIn('VERIFY_TOKEN',process.env)){
    if(validator.isEmpty(process.env.VERIFY_TOKEN)){
        throw new Error('VERIFY_TOKEN is empty!')
    }
}else {
    throw new Error('VERIFY_TOKEN Is missing in .env !')
}
if(validator.isIn('APP_SECRET',process.env)){
    if(validator.isEmpty(process.env.APP_SECRET)){
        throw new Error('APP_SECRET is empty!')
    }
}else {
    throw new Error('APP_SECRET Is missing in .env !')
}
let config = {
    PAGE_ACCESS_TOKEN:process.env.PAGE_ACCESS_TOKEN,
    APP_SECRET:process.env.APP_SECRET,
    VERIFY_TOKEN:process.env.VERIFY_TOKEN
}
module.exports = config
