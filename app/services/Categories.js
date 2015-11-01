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
					, thumbnailSize : 2
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
					, title: "One Sided Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 2
					, desc : "One sided leaflet"
				}
				,{ 
					id: 2 
					, type : "leaflet"
					, title: "Double Sided Leaflet"
					, icon: "images/leaflet.jpg"
					, thumbnailSize : 2
					, desc : "Double sided leaflet"
				}
				,{ 
					id: 3
					, type : "leaflet"
					, title: "Horizontally Folded Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 2
					, desc : "Horizontally folded card"
				}
				,{ 
					id: 4 
					, type : "leaflet"
					, title: "Vertically Folded Leaflet"
					, icon: "images/leaflet.jpg"
					, size: { x : 100, y: 160, z: 0 }
					, thumbnailSize : 2
					, desc : "Vertically folded card"
				}
			]
		}
	};
	
	return Service;
}]);

	