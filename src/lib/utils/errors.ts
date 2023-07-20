
const raise = (err: string | Error): never => {
  if(typeof err === "string"){
    throw new Error(err);
  }
  throw err;
};
export default raise;
