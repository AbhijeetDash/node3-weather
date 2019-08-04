const request = require('request')

const geo = (map, handler)=>{
    request({url: map, json: true}, (error, data)=>{
        if(error){
            return handler({condition : undefined, error : "No Internet"})
        } else if(data.body.features.length === 0){
            return handler({condition : undefined,error : "Place doesn't exists!"})
        } else {
            return handler({condition : data.body.features[0], error : undefined})
        }
    })
}

module.exports = geo