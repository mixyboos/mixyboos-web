import { useEffect, useState } from "react";
import logger from "@/lib/logger";
import createSignalRConnection from "@/lib/services/realtime/signalr";
const useAudioProcessingStatus = (token: string) => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [processPercentage, setProcessPercentage] = useState(0);
  logger.debug("Signalr", "useAudioProcessingStatus", "Token", token);
  useEffect(() => {
    if (!token) return;

    const connection = createSignalRConnection("updates", token);
    connection.start().then(() => {
      logger.debug(
        "Signalr",
        "useAudioProcessingStatus",
        "Connected",
        connection,
      );
      connection.on("ConversionStarted", (showId: string) => {
        debugger;
        logger.debug("Signalr", "ConversionProgress", showId);
      });
      connection.on("ConversionProgress", (showId: string, value: number) => {
        debugger;
        logger.debug("Signalr", "ConversionProgress", showId, value);
        setProcessPercentage(value);
      });
      connection.on("ConversionFinished", (showId: string) => {
        debugger;
        logger.debug("Signalr", "ConversionProgress", showId);
        setIsProcessed(true);
      });
      connection.on("ConversionFailed", (showId: string) => {
        debugger;
        logger.debug("Signalr", "ConversionProgress", showId);
        setIsProcessed(true);
      });
    });
  });
  return { isProcessed, processPercentage };
};
export default useAudioProcessingStatus;
