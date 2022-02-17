import auth0 from "@/lib/auth0";

export default auth0.handleAuth({ async login(req, res) {
    try {
      await auth0.handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.NEXT_PUBLIC_IDENTIFIRE, // or AUTH0_AUDIENCE
          // Add the `offline_access` scope to also get a Refresh Token
          scope: "openid profile email read:products", // or AUTH0_SCOPE
        },
      });
    } catch (error: any) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
