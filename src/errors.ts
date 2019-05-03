import { RouteLocationNormalized, RouteLocation } from './types'

export class NoRouteMatchError extends Error {
  constructor(currentLocation: any, location: any) {
    super('No match for ' + JSON.stringify({ ...currentLocation, ...location }))
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * Error used when rejecting a navigation because of a redirection. Contains
 * information about where we where trying to go and where we are going instead
 */
export class RedirectError extends Error {
  from: RouteLocationNormalized
  to: RouteLocation
  constructor(from: RouteLocationNormalized, to: RouteLocation) {
    super(
      `Redirected from "${from.fullPath}" to "${stringifyRoute(
        to
      )}" via a navigation guard`
    )
    Object.setPrototypeOf(this, new.target.prototype)

    this.from = from
    this.to = to
  }
}

function stringifyRoute(to: RouteLocation): string {
  if (typeof to === 'string') return to
  if ('path' in to) return to.path
  return 'TODO'
}