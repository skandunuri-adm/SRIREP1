sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("colt.fiori.Component", {
        metadata:{
            manifest : "json"
        },
        init: function(){
            
                UIComponent.prototype.init.apply(this);
                
                var oRouter = this.getRouter();
                oRouter.initialize();
        },
        // createContent: function () {
            
        //     var oView = new sap.ui.view({
        //         id: "idAppView",
        //         viewName: "colt.fiori.view.App",
        //         type: "XML"
        //     });
        //     var oAppCon = oView.byId("idAppCon");
        //     var oView1 = sap.ui.view({
        //         id: "idView1",
        //         viewName: "colt.fiori.view.View1",
        //         type: "XML"
        //     });
        //     var oView2 = sap.ui.view({
        //         id: "idView2",
        //         viewName: "colt.fiori.view.View2",
        //         type: "XML"
        //     });
        //     var oAvengerss = sap.ui.view({
        //         id: "idAvengers",
        //         viewName: "colt.fiori.view.Avengers",
        //         type: "XML"
        //     });

        //     oAppCon.addMasterPage(oView1).addDetailPage(oAvengerss).addDetailPage(oView2);


        //     return oView;
        // },
        destroy: function () {
            

        }


    });
    
});