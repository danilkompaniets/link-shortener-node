import { Request, Response } from "express";
import { prismaClient } from "../..";
import { link } from "fs";

export const addLink = async (req: Request, res: Response) => {
  const { alias } = req.params;
  const { link } = req.body;

  await prismaClient.link.create({
    data: {
      alias: alias,
      link: link,
    },
  });

  console.log(link);
  res.json({ link });
};
