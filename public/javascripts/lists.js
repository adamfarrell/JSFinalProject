function ViewModel() {
	const self = this;
	self.possiblyDoomedList = '';
	self.observableLists = ko.observableArray(lists);
	self.editList = function(list_item) {
		editListPage(list_item._id);
	};
	self.confirmDeleteList = function(list_item) {
		self.possiblyDoomedList = list_item;
		askForConfirmation('Confirm Delete', list_item);
	};
	self.deleteList = function() {
		console.log(self.possiblyDoomedList);
		self.observableLists.remove(self.possiblyDoomedList);
		deleteListPage(self.possiblyDoomedList._id);
	};
}

ko.applyBindings(ViewModel);