import express from 'express';

declare global {
  namespace Express {
    interface Request {
      session?: Record<string, any>;
      files?: Record<string, any>;
    }
  }
}
