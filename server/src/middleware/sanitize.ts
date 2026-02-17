import { Request, Response, NextFunction } from 'express';

export const sanitize = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (value: any) => {
    if (typeof value === 'string') {
      return value.trim().replace(/\0/g, '').replace(/<[^>]*>/g, '').substring(0, 10000);
    }
    return value;
  };

  const sanitizeObject = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = sanitizeString(obj[key]);
      }
    }
  };

  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);

  next();
};