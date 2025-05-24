import LiveShowWrapper from "@/components/show/wrapper";
import LiveService from "@/lib/services/api/live-service";

const CreateLivePage = async () => {
  const currentShow = await LiveService.getCurrentShow();
  return <LiveShowWrapper incomingShow={currentShow} />;
};
export default CreateLivePage;
