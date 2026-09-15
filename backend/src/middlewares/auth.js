import { clerkMiddleware, getAuth } from '@clerk/express';
import { config } from '../config/index.js';

const isLiveKey =
  Boolean(config.clerkSecretKey) &&
  !config.clerkSecretKey.includes('example') &&
  Boolean(config.clerkPublishableKey) &&
  !config.clerkPublishableKey.includes('example');

let clerkInstanceMiddleware = null;
if (isLiveKey) {
  try {
    clerkInstanceMiddleware = clerkMiddleware({
      secretKey: config.clerkSecretKey,
      publishableKey: config.clerkPublishableKey,
    });
  } catch (err) {
    console.warn('Could not initialize Clerk middleware:', err.message);
  }
}

export const clerkAuth = (req, res, next) => {
  if (clerkInstanceMiddleware) {
    return clerkInstanceMiddleware(req, res, next);
  }
  next();
};

export const requireAuth = (req, res, next) => {
  if (clerkInstanceMiddleware) {
    try {
      const auth = getAuth(req);
      if (auth?.userId) {
        req.auth = auth;
        return next();
      }
    } catch {
      // Fall through to dev check
    }
  }

  // Developer fallback for testing environments
  const devUserId = req.headers['x-user-id'] || req.query.userId || req.body?.userId;
  if (!isLiveKey || config.nodeEnv === 'development') {
    if (devUserId) {
      req.auth = { userId: devUserId };
      return next();
    }
  }

  return res.status(401).json({
    error: 'Unauthorized: Authentication required',
  });
};
