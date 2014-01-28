(function() {


    /**
     * Webinos Sensor service constructor (client side).
     * @constructor
     * @param obj Object containing displayName, api, etc.
     */
    SmartObjectModule = function(obj) {
       //this.base = WebinosService;
       //this.base(obj);
       WebinosService.call(this, obj);
    };

    //SmartObjectModule.prototype = new WebinosService;
    SmartObjectModule.prototype = Object.create(WebinosService.prototype);
    // The following allows the 'instanceof' to work properly
    SmartObjectModule.prototype.constructor = SmartObjectModule;
    // Register to the service discovery
    _webinos.registerServiceConstructor("http://webinos.org/api/smartobject", SmartObjectModule);
    
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
