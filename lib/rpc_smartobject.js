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
******************************************************************************/

(function () {

    var fs = require('fs');
    var path = require("path");
    var objectsLoaded = false;
    var loadedObjects = [];
    var objectsLocation = __dirname + "/objects";
    var smart_objects = {};

    var SmartObjectModule = function (rpcHandler, params) {
        
        this.rpcHandler = rpcHandler;
        this.params = params;


        this.init = function(register, unregister) {
            var objects = loadObjects();

            var sslib = require(__dirname+'/smartobject_lib.js');
            for(var i in objects){
                //console.log("Registering "+objects[i]);
                var service = new sslib.SmartObjectService(this.rpcHandler, objects[i]);
                register(service);
                //smart_objects[id] = service;
            }
            
        };
    }

    function loadObjects() {
        var objects_list = [];
        var objectHandles = fs.readdirSync(objectsLocation);
        for(var i in objectHandles) {
            if(objectHandles[i].indexOf("webinos-object-") == 0){
                if(loadedObjects.indexOf(objectHandles[i]) == -1){
                    try {             
                        var objectHandle = require(objectsLocation+"/"+objectHandles[i]);
                        objects_list.push(objectHandle);
                    }
                    catch(e) {
                        console.log('Error: cannot load object ' + (objectsLocation+"/"+objectHandles[i]));
                        console.log(e.message);
                    }
                }
            }
        }
        objectLoaded = true;
        return objects_list;
    }

    exports.Module = SmartObjectModule;

}());
