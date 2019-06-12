$(function() {

  $('#new-form').submit(function(event) {
    event.preventDefault();

    let task = {
      task: {
        title:  $('.new-todo').val()
      }
    };

    $.post("/tasks", task, (data) => {
      $('.todo-list').append(taskHtml(data));
    });
  });

  // The taskHtml method takes in a JavaScript representation
  // of the task and produces an HTML representation using
  // <li> tags
  function taskHtml(task) {
    let checkedStatus = task.done ? "checked" : "";
    return (`
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" data-id="${task.id}" ${checkedStatus} />
          <label>${task.title}</label>
        </div>
      </li>
    `);
  }

  // toggleTask takes in an HTML representation of the
  // an event that fires from an HTML representation of
  // the toggle checkbox and  performs an API request to toggle
  // the value of the `done` field
  function toggleTask(e) {
    $.ajax(`/tasks/${$(e.target).data("id")}`, {
      method: "PUT",
      data: {
        task: {
          done: Boolean($(e.target).is(':checked'))
        }
      }
    });
  }

  $.get("/tasks").success((data) => {
    for (var i = 0; i < data.length; i++) {
      $('.todo-list').append(taskHtml(data[i]));
    }

    $('.toggle').change(toggleTask);

  });
});
