webinos-api-smartobject
=======================

API for smart objects

Open the file webinos-utilities/wrt/webinos.servicedisco.js and add the following line to the findservice function:

if (typeof SmartObjectModule !== 'undefined') typeMapCompatible['http://webinos.org/core/smartobject'] = SmartObjectModule;
