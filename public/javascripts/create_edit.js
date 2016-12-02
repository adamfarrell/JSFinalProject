const enterButton = 13;

function isValidString(string) {
	const regex = /^[\S][\w?\W?]{0,50}/;
	return regex.test(string);
}

function ViewModel() {
	const self = this;
	self.observableItems = ko.observableArray(listItems);
	self.newItem = ko.observable('');
	self.listTitle = ko.observable(title);
	self.addItem = function() {
		if (isValidString(self.newItem())) {
			observableItems.push({ content: self.newItem() });
			self.newItem('');
		} else {
			displayResponse('Invalid Text Input');
			self.newItem('');
		}
			
	};
	self.enterAddItem = function (data, event) {
		if (event.keyCode === enterButton)
			self.addItem();
		return true;
	};
	self.saveList = function() {
		if (isValidString(self.listTitle())) {
			let allItemsValid = true;
			for (let i = 0; i < self.observableItems().length; i++) {
				if (!isValidString(self.observableItems()[i].content))
					allItemsValid = false;
			}

			if (allItemsValid) {
				$.ajax({
					type: 'POST',
					url: '/list/api/save',
					success: data => {
						if (typeof data === 'object') {
							listId = data.id;
							displayResponse(data.status);
						} else
							displayResponse(data);
					},
					data: {
						list: JSON.stringify({
							_id: listId,
							title: self.listTitle(),
							items: self.observableItems(),
						})
					}
				});
			} else
				displayResponse('Invalid Text Input');

				
		} else
			displayResponse('Invalid Text Input');
	};
	self.deleteItem = function(item) {
		self.observableItems.remove(item);
	};
}

ko.applyBindings(ViewModel);