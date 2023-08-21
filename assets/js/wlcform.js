var WlcValidation = function(configrations){
	var self = this;
	self.wlcForms = new Array();
	for(var i=0;i<configrations.length;i++){
		self.wlcForms[i] = new WlcForm(configrations[i]);
	}

	////console.log(self.wlcForms);
	self.validate = function(){
		self.beforeValidation();
		var noError = true;
		for(var i=0;i<self.wlcForms.length;i++){
			if(!self.wlcForms[i].validate()){
				noError = false;
			}
		}
		return noError;
	}

	self.getElement = function(elmName){
		for(var i=0;i<self.wlcForms.length;i++){
			if(self.wlcForms[i].config["name"] == elmName){
				return self.wlcForms[i];
			}
		}
	}

	self.changeRule = function(elmName,ruleArray){
		var elm = self.getElement(elmName);
		elm.config["rules"] = ruleArray;
	}

	self.beforeValidation = function(){

	}



}
var WlcForm = function(config){
	var self = this;
	self.config = config;
	self.errors = new Array();
	self.validate = function(){
		////console.log(self.config);
		var val = self.val();

		self.errors = new Array();
		if(typeof(self.config["rules"])!="undefined" && self.config["rules"]!=null){

			if(self.config["rules"].length){

				for(var i=0;i<self.config["rules"].length;i++){
					var rule = self.config["rules"][i];
					//console.log(rule);
					if(rule == "required"){
						if(typeof(val)=="undefined" || val=="" || val==null){
							$(".validation-"+self.config["name"]).addClass("error-required");
							self.errors.push("required");
						}else{
							$(".validation-"+self.config["name"]).removeClass("error-required");
							self.errors  = self._removeFromArray ("required",self.errors);
						}

					}

					if(rule == "email"){
						var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.+-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
						if (!regexp.test(val)) {
							$(".validation-"+self.config["name"]).addClass("error-email");
							self.errors.push("email");
						}else{
							$(".validation-"+self.config["name"]).removeClass("error-email");
							self.errors  = self._removeFromArray ("email",self.errors);
						}
					}

					if(rule == "number" || rule == "numeric" ){
						//console.log("NUMBER"+val);
						var regexp =  /^[0-9]*$/;
						if (!regexp.test(val)) {
							$(".validation-"+self.config["name"]).addClass("error-number");
							self.errors.push("number");
						}else{
							$(".validation-"+self.config["name"]).removeClass("error-number");
							self.errors  = self._removeFromArray ("number",self.errors);
						}
					}

				}
			}
			////console.log(self.config["name"],self.config["rules"]);
			if(jQuery.inArray("required", self.config["rules"])==-1){
				$(".validation-"+self.config["name"]).removeClass("error-required");
				self.errors  = self._removeFromArray ("required",self.errors);
			}
			if(jQuery.inArray("email", self.config["rules"])==-1){
				$(".validation-"+self.config["name"]).removeClass("error-email");
				self.errors  = self._removeFromArray ("email",self.errors);
			}
			if(jQuery.inArray("number", self.config["rules"])==-1){
				$(".validation-"+self.config["name"]).removeClass("error-number");
				self.errors  = self._removeFromArray ("number",self.errors);
			}
		}
		if(self.errors.length==0){
			return true;
		}
		return false;
	}
	self.addRule = function(r){
		var chk = false;
		for(var i=0;i<self.config["rules"].length;i++){
			if(self.config["rules"][i]==r){
				chk = true;
			}
		}
		if(!chk){
			self.config["rules"].push(r);
		}
	}
	self.removeRule = function(r){
		/*
		var newArray = new Array();
		for(var i=0;i<self.config["rules"].length;i++){
			if(self.config["rules"][i]!=r){
				newArray.push(self.config["rules"][i]);
			}
		}
		self.config["rules"] = newArray;
		*/
		//console.log(self.config["name"],"remove",r);
		self.config["rules"]  = self._removeFromArray (r,self.config["rules"]);
		//console.log(self.config["name"],self.config["rules"]);
	}
	self._removeFromArray = function(val,arr){
		var newArray = new Array();
		for(var i=0;i<arr.length;i++){
			if(arr[i]!=val){
				newArray.push(arr[i]);
			}
		}
		return newArray;
	}
	self.val = function(){
		if(self.config["type"]=="radio"){
			var val = $("*[validationName='"+self.config["name"]+"']:checked").val();
		}else if(self.config["type"]=="checkbox"){
			var val = $("*[validationName='"+self.config["name"]+"']:checked").map(function() {
				return $(this).val();
			}).get();
			//console.log("@@@@");
			//console.log(self.config["name"]);
			//console.log(val);
		}else{
			var val = $("*[validationName='"+self.config["name"]+"']").val();
		}
		if(typeof(val)=="undefined"){
			val = null;
		}
		if(self.config["type"]=="select"){
			if(val=="0"){
				val = null;
			}
		}
		return val;
	}
}

$(document).ready(function(){
	wlcValidation = new WlcValidation(wlcFormConfigrations);
});