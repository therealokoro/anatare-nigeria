import { type as arkType } from "arktype";

export interface MessageContext {
  actual: any;
  expected?: string;
  path?: string;
  code?: string;
}

export type SingleErrorConfig =
  | string
  | { message: string | ((ctx: MessageContext) => string) }
  | ((ctx: MessageContext) => string);

/** Optional runtime hook for debugging or logging failed validations */
let onErrorHook: ((ctx: MessageContext) => void) | undefined;

/**
 * Normalize any error config into a consistent message function.
 */
function toMessageFn(cfg: SingleErrorConfig): (ctx: MessageContext) => string {
  if (typeof cfg === "string") return () => cfg;
  if (typeof cfg === "function") return cfg;

  const msg = cfg.message;
  return typeof msg === "string" ? () => msg : msg;
}

/**
 * Apply a custom message configuration to a base ArkType type.
 */
function applyConfig(base: any, cfg: SingleErrorConfig) {
  const messageFn = toMessageFn(cfg);

  if (typeof base.configure === "function") {
    return base.configure({
      message: (ctx: any) => {
        const context: MessageContext = {
          actual: ctx.actual,
          expected: ctx.expected,
          path: ctx.propString,
          code: ctx.code,
        };
        onErrorHook?.(context);
        return messageFn(context);
      },
    });
  }

  return base;
}

/**
 * A fully type-safe wrapper around ArkType's `type()` that:
 * - Behaves exactly like ArkType
 * - Allows per-field custom error messages
 * - Supports string, function, or `{ message }` forms
 * - Optionally fires an onError hook
 */
export function wrapType<const Def>(
  def: Def,
  config?: Def extends object
    ? { [K in keyof Def]?: SingleErrorConfig }
    : SingleErrorConfig
): ReturnType<typeof arkType<Def>> {
  const base = (arkType as any)(def);

  if (!config) return base;

  // Single-type definition
  if (typeof def === "string" || (def as any)?.parse) {
    return applyConfig(base, config as SingleErrorConfig) as ReturnType<typeof arkType<Def>>;
  }

  // Object schema definition
  const schema: Record<string, any> = {};
  for (const [key, value] of Object.entries(def as any)) {
    const fieldCfg = (config as Record<string, SingleErrorConfig>)[key];
    schema[key] = fieldCfg
      ? applyConfig((arkType as any)(value), fieldCfg)
      : (arkType as any)(value);
  }

  return (arkType as any)(schema);
}

/**
 * Optional hook for side effects (e.g. logging) when validation fails.
 * Example:
 *   wrapType.onError((ctx) => console.warn("Validation error:", ctx));
 */
wrapType.onError = (fn: (ctx: MessageContext) => void) => {
  onErrorHook = fn;
};
