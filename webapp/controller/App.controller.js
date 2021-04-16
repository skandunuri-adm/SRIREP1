sap.ui.define([
    'colt/fiori/controller/BaseController'
    // 'sap/ui/core/mvc/Controller'
], function(BaseController) {
    //'use strict';
return BaseController.extend("colt.fiori.controller.App", {
        onInit: function (){
        console.log("  Hi from App controller Init funtion");
        }


});
});