defmodule MicroblogWeb.PageController do
  use MicroblogWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def feed(conn, _params) do
    posts = Enum.reverse(Microblog.Social.feed_posts_for(conn.assigns[:current_user]))

    changeset = Microblog.Social.change_post(%Microblog.Social.Post{})
    render conn, "feed.html", posts: posts, changeset: changeset
  end
end
