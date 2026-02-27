export default eventHandler(async (event) => {
  // IMPORTANT: Authenticate user and validate payload!
  const payload = { ...getQuery(event) };
  const { result } = await runTask("db:seed", { payload });

  return { result };
});
