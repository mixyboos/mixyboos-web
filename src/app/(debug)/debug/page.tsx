const Debug = () => {
  return (
    <div className="p-8">
      <h1>Debug</h1>
      <div>
        <h2>Environment</h2>
        <pre>{JSON.stringify(process.env, null, 2)}</pre>
      </div>
    </div>
  );
};
export default Debug;
    