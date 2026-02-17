import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const ownership = (entity: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const record = await prisma[entity].findUnique({ where: { id } });
    if (!record || record.userId !== req.user?.id) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this resource' } });
    }
    next();
  };
};