import { useEffect, useState } from "react";
import logger from "@/lib/logger";
import createSignalRConnection from "@/lib/services/realtime/signalr";
const useAudioProcessingStatus = () => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [processPercentage, setProcessPercentage] = useState(0);
  useEffect(() => {

    const connection = createSignalRConnection("updates");
    connection.start().then(() => {
      logger.debug(
        "Signalr",
        "useAudioProcessingStatus",
        "Connected",
        connection,
      );
      connection.on("ConversionStarted", (showId: string) => {
        logger.debug("Signalr", "ConversionProgress", showId);
      });
      connection.on("ConversionProgress", (showId: string, value: number) => {
        logger.debug("Signalr", "ConversionProgress", showId, value);
        setProcessPercentage(value);
      });
      connection.on("ConversionFinished", (showId: string) => {
        logger.debug("Signalr", "ConversionProgress", showId);
        setIsProcessed(true);
      });
      connection.on("ConversionFailed", (showId: string) => {
        logger.debug("Signalr", "ConversionProgress", showId);
        setIsProcessed(true);
      });
    });
  });
  return { isProcessed, processPercentage };
};
export default useAudioProcessingStatus;
