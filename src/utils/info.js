const request = require('request')
const condition = (darkSky, handler)=>{
    try {
        request({url: darkSky, json: true},(error, condition)=>{
            try{
                if(condition.body.error){
                    handler({condition : undefined, error : data.body.error})
                } else {
                    handler({condition, error : undefined})
                }
            }catch(error){
                return handler({condition : undefined, error : "Dissconnected"})
            }
        })
    } catch (error) {
        return handler({condition : undefined, error : "No Internet Connection"})
    }
}

module.exports = condition

