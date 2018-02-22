// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";
import $ from "jquery";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

function update_buttons() {
  $('.follow-button').each( (_, bb) => {
    let user_id = $(bb).data('user-id');
    let follow = $(bb).data('follow');
    if (follow != "") {
      $(bb).text("Unfollow");
    }
    else {
      $(bb).text("Follow");
    }
  });
}

function set_button(user_id, value) {
  $('.follow-button').each( (_, bb) => {
    if (user_id == $(bb).data('user-id')) {
      $(bb).data('follow', value);
    }
  });
  update_buttons();
}

function follow(user_id) {
  let text = JSON.stringify({
    follow: {
        follower_id: current_user_id,
        followee_id: user_id
      },
  });

  $.ajax(follow_path, {
    method: "post",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => { set_button(user_id, resp.data.id); },
  });
}

function unfollow(user_id, follow_id) {
  $.ajax(follow_path + "/" + follow_id, {
    method: "delete",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: "",
    success: () => { set_button(user_id, ""); },
  });
}

function follow_click(ev) {
  let btn = $(ev.target);
  let follow_id = btn.data('follow');
  let user_id = btn.data('user-id');

  if (follow_id != "") {
    unfollow(user_id, follow_id);
  }
  else {
    follow(user_id);
  }
}

function init_follow() {
  if (!$('.follow-button')) {
    return;
  }

  $(".follow-button").click(follow_click);

  update_buttons();
}

$(init_follow);
