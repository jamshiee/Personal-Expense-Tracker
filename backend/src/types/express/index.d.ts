import { User } from '../../entities/User';
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
