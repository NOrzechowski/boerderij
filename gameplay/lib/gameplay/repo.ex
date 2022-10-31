defmodule Gameplay.Repo do
  use Ecto.Repo,
    otp_app: :gameplay,
    adapter: Ecto.Adapters.Postgres
end
