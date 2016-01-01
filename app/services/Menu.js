var module = angular.module('cards.services.Menu',[]);

module.service('MenuService', [function () { 

	var Service = {};

	Service.selected = null;
	Service.expanded = null;
	Service.tabs = {
		home : {
			expanded : false
		}
		,login : {
			expanded : false
		}
		,register : {
			expanded : false
		}
		,basket : {
			expanded : false
		}
		,businessCards : { 
			expanded : false
			, thumbnails : [
				{
					id: 1
					, type : "businessCards"
					, flatGeometry : 'Card'
					, title: 'Standard Card Econony'
					, icon: "images/tabs/card.jpg"
					, productSize: { x : 100, y: 160, z: 0 }
					, modelSize : { x : 250, y : 120 } 
					, thumbnailSize : 4
					, desc : "Standard card economy"
				}
				,{
					id: 2
					, type : "businessCards"
					, title: 'Standard Card Extra'
					, flatGeometry : 'Card'
					, icon: "images/tabs/card.jpg"
					, productSize: { x : 100, y: 160, z: 0 }
					, modelSize : { x : 250, y : 120 } 
					, thumbnailSize : 4
					, desc : "Standard card extra"
				}
				,{
					id: 3
					, type : "businessCards"
					, title: 'Plastic Card'
					, flatGeometry : 'Card'
					, icon: "images/tabs/card.jpg"
					, productSize: { x : 100, y: 160, z: 0 }
					, modelSize : { x : 250, y : 120 } 
					, thumbnailSize : 4
					, desc : "Plastic business card"
				}
			]
		}
		,invitations : { 
			expanded : false 
			, thumbnails : [	
				{ 
					id: 1 
					, type : "invitations"
					, title: "Standard Wedding Invitation"
					, flatGeometry : 'HorizontallyFoldedCard'
					, icon: "images/tabs/invitationH.jpg"
					, productSize: { x : 100, y: 160, z: 0 }
					, modelSize : { x : 250, y : 120, z : 90 } 
					, thumbnailSize : 6
					, desc : "Horizontally folded card"
				}
				,{ 
					id: 2
					, type : "invitations"
					, title: "Standard Wedding Invitation"
					, flatGeometry : 'VerticallyFoldedCard'
					, icon: "images/tabs/invitationV.jpg"
					, productSize: { x : 100, y: 160, z: 0 }
					, modelSize : { x : 100, y : 250, z : 80 } 
					, thumbnailSize : 6
					, desc : "Vertically folded card"
				}
			]
		}
		// LEAFLETS
		,leaflets : { 
			expanded : false
			, thumbnails : [
				{ 
					id: 1
					, type : "leaflets"
					, title: "Vertically C Folded DL Leaflet"
					, flatGeometry : 'VerticallyCFoldedDLLeaflet'
					, icon: "images/tabs/leaflet.jpg"
					, productSize: { x : 210, y: 99, z: 0 }
					, modelSize : { x : 99, y : 210, z : 0 } 
					, thumbnailSize : 6
					, desc : "Vertically C Folded DL Leaflet"
				}
				,{ 
					id: 2 
					, type : "leaflets"
					, title: "Vertically Z Folded DL Leaflet"
					, flatGeometry : 'VerticallyZFoldedDLLeaflet'
					, productSize: { x : 210, y: 99, z: 0 }
					, size : { x : 99, y : 210, z : 0 } 
					, icon: "images/tabs/leaflet.jpg"
					, thumbnailSize : 6
					, desc : "Vertically Z Folded DL Leaflet"
				}
			]
		}
	}

	
	Service.setSelected = function (set) {
		Service.selected = set;
	}
	
	return Service;
}]);

	