var module = angular.module('cards.services.Categories',[]);

module.service('CategoriesService', [function () { 

	var Service = {
		businessCards : { 
			expanded : false
			, thumbnails : [
				{
					id: 1
					, type : "businessCards"
					, title: 'Standard Card Econony'
					, icon: "images/card.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 4
					, desc : "Standard card economy"
				}
				,{
					id: 2
					, type : "businessCards"
					, title: 'Standard Card Extra'
					, icon: "images/card.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 4
					, desc : "Standard card extra"
				}
				,{
					id: 3
					, type : "businessCards"
					, title: 'Plastic Card'
					, icon: "images/card.jpg"
					, size: { x : 100, y: 160, z: 0 }
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
					, icon: "images/invitationH.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 6
					, desc : "Horizontally folded card"
				}
				,{ 
					id: 2
					, type : "invitations"
					, title: "Standard Wedding Invitation"
					, icon: "images/invitationV.jpg"
					, size: { x : 100, y: 160, z: 0 }
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
					, icon: "images/leaflet.jpg"
					, size: { x : 210, y: 99, z: 0 }
					, thumbnailSize : 3
					, desc : "Vertically C Folded DL Leaflet"
				}
				,{ 
					id: 2 
					, type : "leaflets"
					, title: "Vertically Z Folded DL Leaflet"
					, size: { x : 210, y: 99, z: 0 }
					, icon: "images/leaflet.jpg"
					, thumbnailSize : 3
					, desc : "Vertically Z Folded DL Leaflet"
				}
				,{ 
					id: 3
					, type : "leaflets"
					, title: "Horizontally Folded Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 3
					, desc : "Horizontally folded card"
				}
				,{ 
					id: 4 
					, type : "leaflets"
					, title: "Vertically Folded Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 3
					, desc : "Vertically folded card"
				}
			]
		}
	};
	
	return Service;
}]);

	