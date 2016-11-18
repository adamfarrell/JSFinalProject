function ViewModel() {
	const self = this;
	self.observableLists = ko.observableArray(lists);
	self.editList = function(list_item) {
		editListPage(list_item._id);
	};
	self.deleteList = function(list_item) {
		self.observableLists.remove(list_item);
		deleteListPage(list_item._id);
	};
}
ko.applyBindings(ViewModel);