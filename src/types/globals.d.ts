// types/globals.d.ts
export {};
export type AppRole = "admin" | "manager";

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      // Per sessioni browser standard
      role?: AppRole;
    };
    publicMetadata?: {
      // Per token JWT da template
      role?: AppRole;
    };
  }

  // CSS module declarations
  interface CSSModuleClasses {
    readonly [key: string]: string;
  }

  // Type declarations for CSS files
  declare module "*.css" {
    const classes: CSSModuleClasses;
    export default classes;
  }

  declare module "*.scss" {
    const classes: CSSModuleClasses;
    export default classes;
  }

  declare module "*.sass" {
    const classes: CSSModuleClasses;
    export default classes;
  }
}
