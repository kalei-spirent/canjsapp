NetworkProfile = can.Model.extend({
    findAll: 'GET /network_profiles/',
    create: 'POST /network_profiles',
    destroy: 'DELETE /network_profiles/{id}',
    findOne: 'GET /network_profiles/{id}'
},{});

TrafficProfile = can.Model.extend({
    findAll: 'GET /traffic_profiles/',
    create: 'POST /traffic_profiles',
    destroy: 'DELETE /traffic_profiles/{id}',
    findOne: 'GET /traffic_profiles/{id}'
},{});

var ProfileController = can.Control.extend({
	init: function(el, options) {
		if (options.type == "NetworkProfile") {
			NetworkProfile.findAll({}, function(nps) {
				profileList = document.getElementById("npList");
				profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
			});
		} else if (options.type == "TrafficProfile") {
			TrafficProfile.findAll({}, function(nps) {
				profileList = document.getElementById("tpList");
				profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
			});
		}
	},

	".addBtn click": function(li, event) {
		
		if (this.options.type == "NetworkProfile") {
			var input = document.getElementById("npName");
			var np = new NetworkProfile({name: input.value});
			np.save();
			NetworkProfile.findAll({}, function(nps) {
				profileList = document.getElementById("npList");
				profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
			});
		}
		else {
			var input = document.getElementById("tpName");
			var np = new TrafficProfile({name: input.value});
			np.save();
			TrafficProfile.findAll({}, function(nps) {
				profileList = document.getElementById("tpList");
				profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
			});
		}
	},

	".deleteBtn click": function(li, event) {

		if (this.options.type == "NetworkProfile") {
			var input = document.getElementById("npName");
			NetworkProfile.findOne({id: input.value}, function(np){
	    		np.destroy();
		    	NetworkProfile.findAll({}, function(nps) {
					profileList = document.getElementById("npList");
					profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
				});
	    	});
		}
		else {
			var input = document.getElementById("tpName");
			TrafficProfile.findOne({id: input.value}, function(np){
	    		np.destroy();
		    	TrafficProfile.findAll({}, function(nps) {
					profileList = document.getElementById("tpList");
					profileList.innerHTML = can.view.render("npList.ejs", {nps: nps});
				});
	    	});			
		}
	}
});

$(document).ready( function() {
	new ProfileController("#networkProfile", {type: "NetworkProfile"});
	new ProfileController("#trafficProfile", {type: "TrafficProfile"});
});
