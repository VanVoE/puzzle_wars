/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.2.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as game from "../game";
import type * as lib_middlewareUtils from "../lib/middlewareUtils";
import type * as lib_randomSlug from "../lib/randomSlug";
import type * as lib_withSession from "../lib/withSession";
import type * as sessions from "../sessions";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  game: typeof game;
  "lib/middlewareUtils": typeof lib_middlewareUtils;
  "lib/randomSlug": typeof lib_randomSlug;
  "lib/withSession": typeof lib_withSession;
  sessions: typeof sessions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
