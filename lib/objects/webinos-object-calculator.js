
exports.name = "calculator";
exports.description = "a simple calculator";
exports.type = "office.calculator";

exports.getMethods = function(){
    return [
        {
            name    : "sum",
            inputs  : [ {name: "op1", type: "number"} , {name: "op2", type: "number"}],
            outputs : [ {name: "result", type: "number"}]
        }
    ];
};

exports.sum = function(params){
    return params.op1 + params.op2;
};
