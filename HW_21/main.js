const root = "http://localhost:3000";

class ToDoList {
  list = [];
  root = null;
  toUpdateItem = null;

  template = ({ checked, title, id }) => `
  <li ${checked ? 'class="checked"' : ""} data-id="${id}">
      ${title}
    <button class='edit-button' data-id="${id}">Edit</button>
  </li>`;

  constructor(query) {
    this.root = document.querySelector(query);
    this.root.addEventListener("click", this.onItemClick.bind(this));
  }

  async onItemClick(event) {
    if (event.target.tagName === "BUTTON") {
      const item = this.list.find(item => item.id === event.target.dataset["id"]);
      this.toUpdateItem = item;
      const editInput = document.getElementById("editInput");
      editInput.value = item.title;
      editInput.hidden = false;

      document.getElementById("editBtn").hidden = false;
      document.getElementById("myInput").hidden = true;
      document.getElementById("addBtn").hidden = true;
      return;
    }

    if (event.target.tagName !== "LI") {
      return;
    }
    const id = event.target.dataset["id"];
    await this.updateTodo(
      id,
      !this.getTodoById(id).checked,
      this.getTodoById(id).title
    );
    await this.getList();
    this.render();
  }

  async init() {
    try {
      await this.getList();
    } catch (e) {
      console.error("SOMETHING WENT WRONG", e);
    }
  }

  render() {
    if (!this.root) {
      return;
    }

    const html = this.list.map(this.template).join("");
    this.root.innerHTML = html;
  }

  async getList() {
    const response = await fetch(root + "/todo-list");
    this.list = await response.json();
    return this.list;
  }

  async addTodo(title) {
    const response = await fetch(root + "/todo-list", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  getTodoById(id) {
    return this.list.find(({ id: todoId }) => todoId === id);
  }

  async updateTodo(id, checked, updateTitle) {
    const updateBody = { checked, title: updateTitle };

    const response = await fetch(root + `/todo-list/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
}

window.addEventListener("load", () => {
  const todoList = new ToDoList("#myUL");

  const input = document.getElementById("myInput");
  const button = document.querySelector(".addBtn");

  button.addEventListener("click", async () => {
    const title = input.value;

    if (!title) {
      return;
    }

    await todoList.addTodo(title);
    await todoList.getList();

    todoList.render();
    input.value = "";
  });

  const inputStoreEdit = document.getElementById("editInput");
  const buttonStoreEdit = document.getElementById("editBtn");

  buttonStoreEdit.addEventListener("click", async () => {
    const title = inputStoreEdit.value;
    if (!title) {
      return;
    }
    await todoList.updateTodo(
      todoList.toUpdateItem.id,
      todoList.toUpdateItem.checked,
      title
    );
    await todoList.getList();
    todoList.render();

    document.getElementById("myInput").hidden = false;
    document.getElementById("addBtn").hidden = false;

    document.getElementById("editInput").hidden = true;
    document.getElementById("editBtn").hidden = true;
  });
  todoList.init().then(() => {
    todoList.render();
  });
});