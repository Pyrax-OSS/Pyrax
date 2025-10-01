function checkVersion() {
  return new Response(
    JSON.stringify({ version: "Pyrax - v1.0.0" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const GET = () => checkVersion();
