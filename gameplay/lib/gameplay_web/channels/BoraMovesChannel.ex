defmodule GameplayWeb.BoraMovesChannel do
  use GameplayWeb, :channel
  require Logger

  # TODO: need to wire in logic about each user to the db and keep track that way

  def join("moves", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast!(socket, "moves:isPlayerA", nil)
    {:noreply, socket}
  end

  def handle_in("moves:dealCards", params, socket) do
    Logger.info("dealing cards")
    broadcast!(socket, "moves:dealCards", params)
    {:noreply, socket}
  end

  def handle_in("moves:cardPlayed", params, socket) do
    Logger.info("card played")
    broadcast!(socket, "moves:cardPlayed", params)
    {:noreply, socket}
  end
end
