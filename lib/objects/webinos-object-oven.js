

exports.name = "oven";
exports.description = "an oven";
exports.type = "home.oven";

exports.getMethods = function(){
    return [
        {
            name    : "setProgram",
            inputs  : [ {name: "programCode", type: "number"} , {name: "start", type: "datetime"}, {name: "end", type: "datetime"}],
            outputs : []
        },
        {
            name    : "getStatus_async",
            inputs  : [],
            outputs : []
        }
    ];
};

exports.setProgram = function(params){
    return "Program " + params.programCode + " will start at " + params.start + " and will finish at " + params.end;
};

exports.getStatus_async = function(params, successCB, errorCB){
    //return "Program " + params.programCode + " will start at " + params.start + " and will finish at " + params.end;
    successCB("it runs");
};
