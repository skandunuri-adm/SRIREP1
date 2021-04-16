sap.ui.define([
    'colt/fiori/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter'
    // 'sap/ui/core/mvc/Controller'
], function(BaseController,MessageBox, MessageToast, Fragment, Filter) {
    //'use strict';
return BaseController.extend("colt.fiori.controller.View2", {
        onInit: function (){
        console.log("  Hi from View2 controller Init funtion");
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("detail").attachMatched(this.herculis,this);
        },
        herculis:function (oEvent) {
            var sPath = "/" + oEvent.getParameter("arguments").fruitId;
            MessageToast.show("herculis  is called n path is" + sPath);
            this.getView().bindElement({
                path: sPath,
                parameters: { expand : 'To_Supplier2' }                
            });
        },
        onPrev: function () {
            var oAppCon = this.getView().getParent();
            oAppCon.to("idView1");
        },
        oSupplierPopup: null,
        oCityPopup: null,

        onFilter: function(){
            MessageToast.show("This functionality under progress");
            if(!this.oSupplierPopup){
                Fragment.load({
                name: "colt.fiori.fragments.popup",
                controller: this,
                id: "idSupp"
            }).then(this.onCallBack.bind(this));
                
            }else{
                this.oSupplierPopup.open();
            }
             

        },
        onCallBack: function(oFragment){
            this.oSupplierPopup = oFragment;
            this.getView().addDependent(this.oSupplierPopup);
            this.oSupplierPopup.bindAggregation("items", {
                path: '/suppliers',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://supplier',
                    title: '{name}',
                    description: '{city}'
                })
            });
            this.oSupplierPopup.setTitle("Suppliers List");
            this.oSupplierPopup.open();
        },
        inpField: null,
        onF4Help: function(oEvent){
             MessageToast.show("This functionality under progress");
             this.inpField = oEvent.getSource();
             if(!this.oCityPopup){
                Fragment.load({
                name: "colt.fiori.fragments.popup",
                controller: this,
                id: "idCity"
            }).then(this.onCallBackCity.bind(this));
                
            }else{
                this.oCityPopup.open();
            }
        },
        onCallBackCity: function(oFragment){
            this.oCityPopup = oFragment;
            this.getView().addDependent(this.oCityPopup);
            this.oCityPopup.bindAggregation("items", {
                path: '/cities',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://home',
                    title: '{name}',
                    description: '{otherName}'
                })
            });
            this.oCityPopup.setTitle("City List");
            this.oCityPopup.setMultiSelect(false);
            this.oCityPopup.open();
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getParameter("id");
            if(sId.indexOf("City") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
            var sCityName = oSelectedItem.getTitle();
            this.inpField.setValue(sCityName);

            }else{
                var aSelectedItems = oEvent.getParameter("selectedItems");
                var aFilter = [];
                for (let index = 0; index < aSelectedItems.length; index++) {
                    const element = aSelectedItems[index];
                    const sTitle = element.getTitle();
                    var oFilter = new Filter("name", "Contains", sTitle);
                    aFilter.push(oFilter);
                    
                }
                var oFilterFinal = new Filter({
                    filters: aFilter,
                    and: false

                });
                this.getView().byId("idTable").getBinding("items").filter(oFilterFinal);

            }
            
        },
        onSave: function () {
            MessageBox.confirm("Are you Sure?", {
                title: "Confirm Me.!!",
                onClose: function(status) {
                    if(status === "OK"){
                        MessageToast.show("Dude, we have placed your order");
                    }else{
                        MessageBox.error("We are sad to inform that you have cancelled order");
                    }
                }

            })
        },
        onItemPress: function (oEvent) {
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("supplier",{
                suppId: sIndex
            });

            MessageToast.show("navigation logic");
        }



});
});