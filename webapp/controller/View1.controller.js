sap.ui.define([
    'colt/fiori/controller/BaseController',
    'colt/fiori/util/formatter',
    'sap/m/MessageToast',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
    // 'sap/ui/core/mvc/Controller'
], function(BaseController, Formatter, MessageToast, Filter, FilterOperator) {
    //'use strict';
return BaseController.extend("colt.fiori.controller.View1", {
        formatter: Formatter,
        onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        },
         onNext: function(sFruitId){
            // // MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
            // var oAppCon = this.getView().getParent();
            // oAppCon.to("idView2");
            this.oRouter.navTo("detail",{
                fruitId: sFruitId
            })
        },
        getAllItems: function (params) {
             var oList = this.getView().byId("idList");
            var allItems = oList.getSelectedItems();
            return allItems;
        },
        onDeleteData: function () {
            var oList = this.getView().byId("idList");
            var allItems = this.getAllItems();
                      
            for (let index = 0; index < allItems.length; index++) {
                const element = allItems[index];
                oList.removeItem(element);
                
            }
        },
        onSelectionChange: function (oEvent) {
            var selectedItem = oEvent.getParameter("listItem");
            var sPath = selectedItem.getBindingContextPath();
            // var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
            // this.getView().getParent().getParent().to("idView2");
            // oView2.bindElement(sPath);
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.onNext(sIndex);
        },
        onNavToNext: function () {
                var allItems = this.getAllItems();
                var allSelected = [];
                for (let index = 0; index < allItems.length; index++) {
                    const element = allItems[index];
                    var item = element.getModel().getProperty(element.getBindingContextPath());
                    allSelected.push(item);
                    
                }

                this.getView().getModel().setProperty("/selectedFruits", allSelected);
                this.onNext();
            
        },
        onAdd: function(params){
            this.oRouter.navTo("addProduct");
        },
        onSearch: function (oEvent2) {
            var searchTerm = oEvent2.getParameter("query");
            if(!searchTerm){
                searchTerm = oEvent2.getParameter("newValue");
            }
            var oFilter = new Filter("CATEGORY", FilterOperator.Contains, searchTerm);
             var oFilter2 = new Filter("type", FilterOperator.Contains, searchTerm);
            var aFilter = [oFilter, oFilter2];
            var oNewFilter = new Filter({
                filters: aFilter,
                and : false 
                });
            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oNewFilter);
        }


});
});