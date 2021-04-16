sap.ui.define([
    'colt/fiori/controller/BaseController',
    'colt/fiori/util/formatter',
    'sap/m/MessageToast',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/ui/core/Fragment'

    // 'sap/ui/core/mvc/Controller'
], function(BaseController, Formatter, MessageToast, Filter, FilterOperator, JSONModel, MessageBox, Fragment) {
    //'use strict';
return BaseController.extend("colt.fiori.controller.Add", {
        formatter: Formatter,
        onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oLocalModel = new JSONModel();
        this.oLocalModel.setData({
                "productData": {
                        "PRODUCT_ID": "",
                        "TYPE_CODE": "PR",
                        "CATEGORY": "Notebooks",
                        "NAME": "",
                        "DESCRIPTION": "",
                        "SUPPLIER_ID": "0100000051",
                        "SUPPLIER_NAME": "TECUM",
                        "TAX_TARIF_CODE": "1 ",
                        "MEASURE_UNIT": "EA",
                        "PRICE": "",
                        "CURRENCY_CODE": "EUR",
                        "DIM_UNIT": "CM"
}
        });
        this.getView().setModel(this.oLocalModel,"data");

        },
        onSave: function(){
            //MessageToast.show("save is yet to define");
            var ODataModel = this.getView().getModel();
            var payload = this.oLocalModel.getProperty("/productData");
            ODataModel.create("/ProductSet", payload, {
                success: function (data) {
                    MessageToast.show("Product is saved into database");
                },
            error: function (oErr) {
                console.log(oErr);
                MessageBox.error(   oErr.message);
            }
            
            });
        },
        inpField: null,
        oSupplierPopup: null,

        onSupplierF4: function (oEvent) {
            
                    MessageToast.show("This functionality under progress");
             this.inpField = oEvent.getSource();
             if(!this.oSupplierPopup){
                Fragment.load({
                name: "colt.fiori.fragments.popup",
                controller: this,
                id: "idSuppliers"
            }).then(this.onCallBackCity.bind(this));
                
            }else{
                this.oSupplierPopup.open();
            }
        },
     
        onCallBackCity: function(oFragment){
            this.oSupplierPopup = oFragment;
            this.getView().addDependent(this.oSupplierPopup);
            this.oSupplierPopup.bindAggregation("items", {
                path: '/SupplierSet',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://home',
                    title: '{BP_ID}',
                    description: '{COMPANY_NAME}'
                })
            });
            this.oSupplierPopup.setTitle("City List");
            this.oSupplierPopup.setMultiSelect(false);
            this.oSupplierPopup.open();
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getParameter("id");
            if(sId.indexOf("idSuppliers") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
            var sCityName = oSelectedItem.getTitle();
            this.inpField.setValue(sCityName);

            }
            
        },
        onEnter: function (oEvent) {
            var productId = oEvent.getParameter("value");
            var ODataModel = this.getView().getModel();
            var that = this;
            ODataModel.read("/ProductSet('" + productId + "')",{
                success: function (data) {
                    that.oLocalModel.setProperty("/productData", data);
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                }
            })
        },
        onLoad: function (oEvent) {
                var productId = oEvent.getParameter("value");
            var ODataModel = this.getView().getModel();
            var that = this;
            ODataModel.callFunction("/GetMostExpesiveProducct",{
                urlParameters: {
                    "I_CATEGORY": 'Notebooks'
                },
                success: function (data) {
                   that.oLocalModel.setProperty("/productData", data)
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                }
            })
        },
        onDelete: function (oEvent) {
            var productId = oEvent.getParameter("value");
            var ODataModel = this.getView().getModel();
            var that = this;
            ODataModel.remove("/ProductSet('" + productId + "')",{
                success: function (data) {
                    MessageToast.show("product deleted succesfully")
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                }
            })
        }

});
});