import { Request, Response, NextFunction } from 'express';

export const validate = (rules: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any = {};

    const validateField = (value: any, rules: string) => {
      const ruleList = rules.split('|');
      for (const rule of ruleList) {
        if (rule === 'required' && !value) {
          return 'Field is required';
        }
        if (rule.startsWith('min:') && value.length < parseInt(rule.split(':')[1])) {
          return `Minimum length is ${rule.split(':')[1]}`;
        }
        if (rule.startsWith('max:') && value.length > parseInt(rule.split(':')[1])) {
          return `Maximum length is ${rule.split(':')[1]}`;
        }
        if (rule === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          return 'Invalid email format';
        }
        // Add more rules as needed
      }
      return null;
    };

    for (const [location, fields] of Object.entries(rules)) {
      if (typeof fields === 'object') {
        for (const [field, fieldRules] of Object.entries(fields)) {
          const error = validateField(req[location][field], fieldRules);
          if (error) {
            if (!errors[location]) errors[location] = {};
            errors[location][field] = error;
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: errors } });
    }

    next();
  };
};