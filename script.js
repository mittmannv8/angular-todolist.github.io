angular.module('todoApp', [])
.controller('todoController', function($scope) {
    $scope.lists = [
        {active: false, name: 'Main', items: []},
    ];

    $scope.todoListCount = (list) => {
        return list.items.filter(e => !e.checked).length;
    }
    $scope.counter = (list) => {
        if (list.items.length == 0) {
            return 0;
        }
        const d = (list.items.filter(e => e.checked).length  / list.items.length) * 100
        return d + '%'
    }

    $scope.selectedTodo = {}
    $scope.selectTodo = (listName) => {
         todoList = $scope.lists.filter(e => e.name == listName)[0];
         if (!todoList) {
            $scope.selectTodo('Main');
         }
         $scope.selectedTodo.active = false;
         todoList.active = true;
         $scope.selectedTodo = todoList;
    }

    $scope.addTodoList = (form) => {
        $scope.lists.push({name: form.newTodoList.toUpperCase(), items: []});
        $scope.form.newTodoList = '';
    }
    
    $scope.addTodoItem = (text) => {
        $scope.selectedTodo.items.push({text})

        delete $scope.newTodoItem;
    }

    $scope.editTodoListName = (list) => {
        console.log(list);
        list.editMode = true;
    }

    $scope.confirmEditTodoListName = (list) => {
        list.editMode = false;
        list.editing = false;
    }

    $scope.changeTodoListName = (event, list) => {
        if (!list.editing) {
            list.editing = true;
        }

        if (event.keyCode === 13) {
            list.editing = false;
            list.editMode = false;
            event.target.blur()
            return
        }
        let name = editText(list.name, event);

        if (!!!name || name === ' ') {
            name = ''
        }
        list.name = name
    }

    $scope.selectTodo('Main')

    $scope.console = (t) => {
        console.log(t)
    }
})

function editText(text, event) {
    const { keyCode, key, metaKey } = event;

    if (metaKey && keyCode == 65) {
        event.preventDefault()
        return text
    }

    if (keyCode >= 48 && key !== 'Dead' && key !== 'Meta') {
        return text + key;
    }

    switch(keyCode) {
        case 32:
            return text + ' ';
        case 8:
            return text.substring(0, text.length - 1);
        default:
            return text;
    }
}