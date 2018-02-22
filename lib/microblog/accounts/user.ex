defmodule Microblog.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Accounts.User

  alias Microblog.Social.Follow

  schema "users" do
    field :email, :string
    field :name, :string
    has_many :follower_follows, Follow, foreign_key: :follower_id
    has_many :followee_follows, Follow, foreign_key: :followee_id
    has_many :followers, through: [:followee_follows, :follower]
    has_many :followees, through: [:follower_follows, :followee]

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end
end
