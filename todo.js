const parameters = {
	main: '.todo__tasks',
	task: 'task',
	input: '.form-control',
	addButton: '.btn-primary'
};

class ToDo {
	tasks = [];
	constructor(parameters) {
		this.main = document.querySelector(parameters.main);
		this.classTask = parameters.task;
		this.input = document.querySelector(parameters.input);
		this.addButton = document.querySelector(parameters.addButton);
		this.init();
	};
	init() {
		this.render();
		this.addButton.addEventListener('click', this.onAddTask.bind(this));
		this.input.addEventListener('keydown', this.onAddByEnter.bind(this));

	};

	render() {
		if (this.tasks.length === 0) return;
		this.tasks.forEach((task, index) => {
			this.createElements(task, index);
		});
	};
	
	createElements(task,index) {
		let mainTask, numberTask, textTask, deleteButton,moveButton, buttons;
			mainTask = document.createElement('div');
			mainTask.className = this.classTask;
			numberTask = document.createElement('div');
			numberTask.innerHTML = index + 1;
			numberTask.className = 'number';
			textTask = document.createElement('div');
			textTask.innerHTML = task;
			textTask.className = 'text';
			buttons = document.createElement('div');
			buttons.className = 'buttons';
			moveButton = document.createElement('button');
			moveButton.classList.add('btn', 'btn-success');
			moveButton.innerHTML = 'Up';
			deleteButton = document.createElement('button');
			deleteButton.classList.add('btn', 'btn-danger');
			deleteButton.innerHTML = 'Delete Task';
			deleteButton.dataset.num = index;
			moveButton.dataset.num = index;
			deleteButton.addEventListener('click', this.onDeleteTask.bind(this));
			moveButton.addEventListener('click', this.onMoveTask.bind(this));
			buttons.append(moveButton);
			buttons.append(deleteButton);
			mainTask.append(numberTask);
			mainTask.append(textTask);
			mainTask.append(buttons);
			this.main.append(mainTask);
	};
	
	
	onDeleteTask(e) {
		let i = e.target.dataset.num;
		this.tasks.splice(i, 1);
		this.deleteAllTasks();
		this.render();
	};

	onMoveTask(e) {
		let i = e.target.dataset.num;
		if (i == 0) return;
		let movingTask = this.tasks.splice(i,1,);
		this.tasks.splice(i-1,0, movingTask);
		this.deleteAllTasks();
		this.render();
	};

	deleteAllTasks() {
		let children = Array.from(this.main.children);
		children.forEach(item => item.remove());
	};

	onAddTask() {
		let task = this.input.value;
		this.input.value = '';
		if (task === '' || !task.trim()) return;
		this.tasks.push(task);
		this.deleteAllTasks();
		this.render();

	};
	onAddByEnter(event) {
		if(event.key === 'Enter') this.onAddTask();
	};

};

new ToDo(parameters);