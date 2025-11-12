import { Request, Response, NextFunction } from "express";

const sslRedirect = (environments = ["production"], status = 302) => {
  const currentEnv = process.env.NODE_ENV;
  const isCurrentEnv = environments.includes(currentEnv);

  return (req: Request, res: Response, next: NextFunction) => {
    const isHttp = isCurrentEnv && req.headers["x-forwarded-proto"] !== "https";

    if (!isHttp) {
      next();
      return;
    }

    const { hostname, originalUrl } = req;
    const newUrl = `https://${hostname}${originalUrl}`;
    res.redirect(status, newUrl);
  };
};

export default sslRedirect;
