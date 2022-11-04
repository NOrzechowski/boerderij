defmodule GameplayWeb.BoraMovesChannel do
  use GameplayWeb, :channel
  require Logger

  # TODO: need to wire in logic about each user to the db and keep track that way

  def join("moves", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    # TODO: can broadcast info to others that someone joined here
    {:noreply, socket}
  end

  def handle_in("moves:dealCards", params, socket) do
    Logger.info("dealing cards")
    broadcast!(socket, "moves:dealCards", params)
    {:noreply, socket}
  end

  # def handle_in("moves:validPlay?", params, socket) do
  #   Logger.info("checking if valid play")
  #   # TODO: way to send response directly to this socket?
  #   {:noreply, socket}
  # end

  def handle_in("moves:cardPlayed", params, socket) do
    Logger.info("card played")
    broadcast!(socket, "moves:cardPlayed", params)
    {:noreply, socket}
  end
end
