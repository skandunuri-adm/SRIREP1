sap.ui.define([
    'colt/fiori/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/routing/History'
    // 'sap/ui/core/mvc/Controller'
], function(BaseController,MessageBox, MessageToast, History) {
    //'use strict';
return BaseController.extend("colt.fiori.controller.Supplier", {
        onInit: function (){
       
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("supplier").attachMatched(this.herculis,this);
        },
        herculis:function (oEvent) {
            var sPath = "/suppliers/" + oEvent.getParameter("arguments").suppId;
            MessageToast.show("herculis  is called n path is" + sPath);
            this.getView().bindElement(sPath);
        },
        onPrev: function () {
            var oAppCon = this.getView().getParent();
            oAppCon.to("idView1");
        },
        onBack: function (params) {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if(sPreviousHash !== undefined){
                    window.history.go(-1);
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detail", {
                    fruitId: 0
                }, true);
            }
            
        }
     

});
});