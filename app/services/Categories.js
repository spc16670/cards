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
					, icon: "images/invitation.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 12
					, desc : "Standard wedding invitation"
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
					, desc : "One sided leaflet"
				}
				,{ 
					id: 2 
					, type : "leaflet"
					, title: "Double Sided Leaflet"
					, icon: "images/leaflet.jpg"
					, thumbnailSize : 3
					, desc : "Double sided leaflet"
				}
				,{ 
					id: 3
					, type : "leaflet"
					, title: "Horizontally Folded Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 3
					, desc : "Horizontally folded card"
				}
				,{ 
					id: 4 
					, type : "leaflet"
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

	