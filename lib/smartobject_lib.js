/*******************************************************************************
 *  Code contributed to the webinos project
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  
 *     http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 *
 ******************************************************************************/

(function() {
    var RPCWebinosService = require("webinos-jsonrpc2").RPCWebinosService;
    
    var SmartObjectService = function(rpcHandler, impl) {
        this.base = RPCWebinosService;
        this.impl = impl;

        this.base({
            api: 'http://webinos.org/api/smartobject/'+ impl.type,
            displayName: impl.name,
            description: impl.description //+' - id '+id
        });

        this.getMethods = function (params, successCallback, errorCallback) {
            var methods = this.impl.getMethods();
            successCallback(methods);
        };

        this.callMethod = function (data, successCallback, errorCallback) {
            //console.log(JSON.stringify(data));
            if(typeof(this.impl[data.method]) == 'function'){
                var result = this.impl[data.method](data.params);
                successCallback(result);
            }
            else
                errorCallback(data.method + " is not a method for " + impl.type);
        };  

        this.callAsyncMethod = function (data, successCallback, errorCallback) {
            //console.log(JSON.stringify(data));
            if(typeof(this.impl[data.method]) == 'function'){
                this.impl[data.method](data.params, successCallback, errorCallback);
                //var result = this.impl[data.method](data.params);
                //successCallback(result);
            }
            else
                errorCallback(data.method + " is not a method for " + impl.type);
        };        
    }

    SmartObjectService.prototype = new RPCWebinosService;
    exports.SmartObjectService = SmartObjectService;
})();