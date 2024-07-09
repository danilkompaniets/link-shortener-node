import { Request, Response } from "express";
import { prismaClient } from "../..";
import { link } from "fs";

export const resolveLink = async (req: Request, res: Response) => {
  const { alias } = req.params;

  const resolvedLink = await prismaClient.link.findUnique({
    where: { alias: alias },
  });
  if (resolvedLink) {
    res.redirect(resolvedLink?.link);
  } else {
    res.json({ error: "incorrect alias" });
  }
};
