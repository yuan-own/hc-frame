var path = require("path");
var webpack=require("webpack");
var searchFile=require("./files");
module.exports={
    entry:searchFile("./web/scripts"),
    output:{
        path: path.join(__dirname, 'web/scripts'),
        filename:"[name].js"
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            output:{
                comments:false
            },
            compress:{
                warnings:false
            }
        }),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};


