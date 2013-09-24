(function() {


    /**
     * Webinos Sensor service constructor (client side).
     * @constructor
     * @param obj Object containing displayName, api, etc.
     */
    SmartObjectModule = function(obj) {
       this.base = WebinosService;
       this.base(obj);
    };
    SmartObjectModule.prototype = new WebinosService;
    
    /**
     * To bind the service.
     * @param bindCB BindCallback object.
     */
    SmartObjectModule.prototype.bind = function(bindCB) {             
        
        if (typeof bindCB.onBind === 'function') {
            bindCB.onBind(this);
        };
    };
    
    SmartObjectModule.prototype.getMethods = function(successCB, errorCB){
        var rpc = webinos.rpcHandler.createRPC(this, "getMethods", []);

        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    };

    SmartObjectModule.prototype.callMethod = function(method_name, params_list, successCB, errorCB){
        var rpc = webinos.rpcHandler.createRPC(this, "callMethod", {method: method_name, params: params_list});

        webinos.rpcHandler.executeRPC(rpc,
            function (params){
                successCB(params);
            },
            function (error){
                errorCB(error);
            }
        );
    };
}());
