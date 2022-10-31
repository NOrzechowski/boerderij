defmodule GameplayWeb.BoraServerSocket do
  use Phoenix.Socket
  require Logger

  channel("moves", GameplayWeb.BoraMovesChannel)

  transport(:websocket, Phoenix.Transports.WebSocket)

  def connect(_params, socket) do
    {:ok, socket}
  end

  # TODO: want to handle disconnects eventually
  # https://medium.com/@fxn/monitoring-websocket-disconnections-in-phoenix-bbe24f54d996
  # https://stackoverflow.com/questions/33934029/how-to-detect-if-a-user-left-a-phoenix-channel-due-to-a-network-disconnect

  def id(_socket), do: nil
end
